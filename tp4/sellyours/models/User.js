const mongoose = require('mongoose');
const itemSchema = require('./Item');

const userSchema = new mongoose.Schema({
    name : String,
    password : String,
    balance : {type : Number, min : 100},
  });

module.exports = userSchema;