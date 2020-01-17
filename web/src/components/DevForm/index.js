import React, {useEffect, useState} from 'react';
//import api from '../../services/api';

function DevForm({ onSubmit }) {
    const [githubUsername,setGuithubUsername] = useState('');
    const [techs,setTechs] = useState('');
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 10000,
          }
        )
      },[]);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username: githubUsername,
            techs,
            latitude,
            longitude
        });

        setTechs('');
        setGuithubUsername('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="">GitHub User Name:</label>
            <input
              name="github_username" 
              id="github_username" 
              required
              value={githubUsername}
              onChange={e => setGuithubUsername(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="">Techs you love:</label>
            <input 
              name="techs" 
              id="techs" 
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
            <div className="input-group">
              <label htmlFor="">Latitude:</label>
              <label htmlFor="">Longitude:</label>
              <input 
                name="latitude" 
                type="number" 
                id="latitude" 
                value={latitude} 
                required
                onChange={e => setLatitude(e.target.value)}
              />
              <input
                name="longitude"
                type="number" 
                id="longitude" 
                value={longitude} 
                required
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
            <button type="submit">Salvar</button>
          </div>
        </form>
    );
}

export default DevForm;