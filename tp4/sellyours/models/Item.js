const mongoose = require('mongoose');
const dbConnection = require('../controllers/dbController');


const itemSchema = new mongoose.Schema({
    name : {type : String, required : true},
    description : String,
    price : {type : Number, min : 1, required : true},
    user_id : {type : mongoose.ObjectId, required : true}
  });

const Item = dbConnection.model('Items', itemSchema, 'items')
module.exports = itemSchema;
module.exports.model = Item