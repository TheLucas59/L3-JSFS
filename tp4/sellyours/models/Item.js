const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name : String,
    price : {type : Number, min : 1},
    user_id : mongoose.ObjectId
  });

const Item = dbConnection.model('Items', itemSchema, 'items')
module.exports = itemSchema;
module.exports.model = Item