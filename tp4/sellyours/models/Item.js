const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name : {type : String, required : true},
    description : String,
    price : {type : Number, min : 1, required : true},
    user_id : mongoose.ObjectId
  });

const Item = dbConnection.model('Items', itemSchema, 'items')
module.exports = itemSchema;
module.exports.model = Item