const mongoose = require('mongoose');

const User = require('../models/User');
const {registerValidation} = require('../routes/validation');





// For registring
module.exports.registerUser = async function(req, res){
    
    // Lets validate the data before we a user
    // const validation = schema.validate(req.body);
    // res.send(validation);ye v sahi h par hme sirfd basic data chahiye error ka

    // // ye do line bs error msg show krega or upar wala pura details dega
    // const { error } = schema.validate(req.body);
    // // res.send(error.details[0].message);
    // if(error){
    //     return res.status(400).send(error.details[0].message);

    // }
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);

    }
    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send('Email already exist');
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