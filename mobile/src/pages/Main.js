import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        async function loadInitialPosition() {
            const {granted} = await requestPermissionsAsync();
            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }

        }
        loadInitialPosition()
    }, []);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        console.log(response.data.devs);
        setDevs(response.data.devs);
    }

    function handleRegionChange( region ) {
        setCurrentRegion(region);
    }

    if(!currentRegion) {
        console.log('region null');
        return null;
    }

    return (
        <>
            <MapView initialRegion={currentRegion} style={styles.map} onRegionChangeComplete={handleRegionChange}>
                { devs.map(dev => (
                    <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url}}/>
                        <Callout onPress={()=>{
                            //navigation
                            navigation.navigate('Profile', { github_username: dev.github_username})
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devname}>{dev.name}</Text>
                                <Text style={styles.devbio}>{dev.bio}</Text>
                                <Text style={styles.devtechs}>{dev.techs.join(',')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search devs"
                    placeholderTextColor="#999999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons size={20} name="my-location" color="#fff"/>
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: { 
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 6,
        borderColor: '#ffffff'
    },
    callout: {
        width: 260,
    },
    devname: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devbio: {
        color: '#666666',
        marginTop: 5
    },
    devtechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20, left: 20, right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#8e4dff',
        justifyContent: 'center',
        alignItems: "center",
        marginLeft: 15
    }
})

export default Main;
