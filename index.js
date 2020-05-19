const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

// db config
const db = require('./config/mongoose');


// parse requests of content type
app.use(bodyParser.urlencoded({extended: true}));
// parse request of content-type
app.use(bodyParser.json());


// Import ROutes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

// Routes middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


// Listen for requests
app.listen(port, function(err){
    if(err){console.log(`Error in running the server, ${err}`)};
    console.log(`Server is running on port: ${port}`);
})