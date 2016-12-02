
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rabbitwarren_db');

var RabbitSchema = new mongoose.Schema({
    name : String,
    breed : String,
    dob : Date
});

module.exports = mongoose.model('Rabbit', RabbitSchema);
