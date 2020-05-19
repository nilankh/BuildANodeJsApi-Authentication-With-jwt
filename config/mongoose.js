const mongoose = require('mongoose');

//ye database se connect krega
mongoose.connect('mongodb://localhost/learing_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));
// finally if connection is successful
db.once('open', function() {
    // we are connected !
    console.log('Successfuuly connected to database');
});
module.exports = db;
