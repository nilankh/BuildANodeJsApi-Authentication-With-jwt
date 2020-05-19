const express = require('express')
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');

// router.post('/register', async (req, res)=>{
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     try {
//         const savedUser = await user.save();
//         res.send(savedUser);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

router.post('/register', userController.registerUser);
router.post('/login', userController.login);

module.exports = router;