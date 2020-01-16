const axios = require('axios');
const Dev = require('../modules/Dev');

module.exports = {

    //buscar devs em um raio de 10km
    //filtrar por tecnologias
    async index(req,res) {
        const { latitude, longitude, techs } = req.query;

        const techsArray = techs.split(',').map(tech => tech.trim());

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.json({ devs });
    },
}