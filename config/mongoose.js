const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/codeial_development');
mongoose.connect('mongodb+srv://admin:admin@cluster0.2du74.mongodb.net/cmsDB?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;