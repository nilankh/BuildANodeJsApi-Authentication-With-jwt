const express = require('express')
const router = express.Router();

const verify = require('./verifyToken');
router.get('/',verify, (req, res)=>{
    // res.json({
    //     posts: {
    //         title: 'my first post',
    //         description: 'random data u should not access'
    //     }
    // });
    res.send(req.user);
});

module.exports = router;