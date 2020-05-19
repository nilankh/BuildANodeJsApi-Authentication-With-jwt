const express = require('express');
const app = express();
const port = 8000;

// db config
const db = require('./config/mongoose');


// Import ROutes
const authRoute = require('./routes/auth');

// Routes middleware
app.use('/api/user', authRoute);


// Listen for requests
app.listen(port, function(err){
    if(err){console.log(`Error in running the server, ${err}`)};
    console.log(`Server is running on port: ${port}`);
})