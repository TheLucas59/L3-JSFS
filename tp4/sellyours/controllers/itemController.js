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
        title : 'Sellyours - Objets à vendre',
        items : allItems
    });
}

const createGet = (_,res) => res.render('createItem', {
    title : "Sellyours - Mettre un objet en vente"
});

const deleteItem = async (req, res) => {
    const deletedItem = await itemSchema.findByIdAndDelete(req.params.itemId)
    res.status(200).json({ message : 'objet supprimé'})
}

const changePrice = async (req, res) => {
    const update = {
        price : req.body.newValue
    }
    const updatedItem = await itemSchema.findByIdAndUpdate(req.params.itemId, update, { new : true} )
    res.status(200).json(updatedItem)
}

module.exports.createPost = createPost
module.exports.createGet = createGet
module.exports.getOthers = getOthers
module.exports.deleteItem = deleteItem
module.exports.changePrice = changePrice
