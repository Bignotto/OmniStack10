const socketio = require('socket.io');
const calculateDistance = require('./modules/utils/calculateDistance');

const connections = [];

exports.setupWebSocket = (server) => {
    const io = socketio(server);

    io.on('connection', socket => {
        const {
            latitude,
            longitude,
            techs
        } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: techs.split(',').map(tech => tech.trim())
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item))
    })
}