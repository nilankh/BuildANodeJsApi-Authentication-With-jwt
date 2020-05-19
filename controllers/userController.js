const mongoose = require('mongoose');

const User = require('../models/User');

// For registring
module.exports.registerUser = async function(req, res){

    // Creation of data base
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

}