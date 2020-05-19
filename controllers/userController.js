const mongoose = require('mongoose');

const User = require('../models/User');

// Validation
const Joi = require('@hapi/joi');
const schema = Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
});


// For registring
module.exports.registerUser = async function(req, res){
    
    // Lets validate the data before we a user
    // const validation = schema.validate(req.body);
    // res.send(validation);ye v sahi h par hme sirfd basic data chahiye error ka

    // ye do line bs error msg show krega or upar wala pura details dega
    const { error } = schema.validate(req.body);
    // res.send(error.details[0].message);
    if(error){
        return res.status(400).send(error.details[0].message);

    }
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