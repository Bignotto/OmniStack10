const {Router} = require('express');
const axios = require('axios');
const Dev = require('./modules/Dev');


const routes = Router();

routes.post('/devs', async (req,res) => {
    console.log(req.body);
    const { github_username, techs } = req.body;
    
    const response = await axios.get(`https://api.github.com/users/${github_username}`);
    const { name = login, avatar_url, bio } = response.data;

    console.log(name,avatar_url,bio);

    const techsArray = techs.split('.').map(tech => tech.trim());

    return res.json({
        Ok:"OK!"
    })
});

module.exports = routes;