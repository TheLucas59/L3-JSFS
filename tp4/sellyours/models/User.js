const mongoose = require('mongoose');
const dbConnection = require('../controllers/dbController');

const userSchema = new mongoose.Schema({
    login : { type : String, required : true },
    password : { type : String, required : true },
    balance : {type : Number, min : 100},
  });


const User = dbConnection.model('Users', userSchema, 'users')
module.exports = userSchema;
module.exports.model = User