const itemSchema = require('../models/Item').model

const createPost = async (req, res) => {
    try {
        const itemData = {
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            user_id : req.userId
        }
        const newItem = await itemSchema.create(itemData); // save item in the database
        res.status(201).json(itemData);
    }
    catch(err) {
        res.status(409).json({ message : err.message });
    }
}

const getOthers = async (req, res) => {
    const allItems = await itemSchema.find().where('user_id').ne(req.userId)
    res.render('listItems', {
        title : 'Objets à vendre',
        items : allItems
    });
}

const createGet = (_,res) => res.redirect('/createItem.html');

module.exports.createPost = createPost
module.exports.createGet = createGet
module.exports.getOthers = getOthers