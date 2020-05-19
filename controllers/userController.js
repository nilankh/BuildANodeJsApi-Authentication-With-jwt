const mongoose = require('mongoose');

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../routes/validation');





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

    // Lets validate the data before we a user
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);

    }
    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send('Email already exist');
    }

    // HashPasswords
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(req.body.password, salt);



    // Creation of data base
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: HashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

}

module.exports.login = async function(req, res){
    // Lets validate the data before we a user
    const { error } = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);

    }

    // Checking if the email is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Email is not found');
    }

    // password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).send('Invalid Password');
    }

    res.send('Logged in');



}