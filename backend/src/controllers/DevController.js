const axios = require('axios');
const Dev = require('../modules/Dev');

module.exports = {
    async index(req,res) {
        const dev = await Dev.find()    ;
        return res.json(dev);
    },

    async store(req,res) {
        //parameters from form
        const { github_username, techs, latitude, longitude } = req.body;

        //check if user already exists
        let dev = await Dev.findOne({ github_username });
        if(!dev) {
                    //get user info from github
        const response = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio } = response.data;

        //split techs string into an array
        const techsArray = techs.split(',').map(tech => tech.trim());
    
        //create location obj
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude]
        }
    
        //store new user
        dev = await Dev.create({
            github_username,
            name,
            bio,
            avatar_url,
            techs:techsArray,
            location
        });

        }
    
        console.log(`/devs > store > new user ${github_username}`);
        return res.json(dev);
    }
}