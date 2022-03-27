const userSchema = require('../models/User').model
const itemSchema = require('../models/Item').model

const me = async (req, res) => {
    const user = await userSchema.findById(req.userId)
    const userItems = await itemSchema.find().where('user_id').eq(req.userId)
    res.render('user', {
        title: "Sellyours - Profil",
        user : user,
        items : userItems
    })
}

const credit = async (req, res) => {
    const user = await userSchema.findById(req.userId)
    const newAmount = user.balance + req.body.amountToAdd
    const updatedUser = await userSchema.findByIdAndUpdate(req.userId, { balance : newAmount })
    res.status(200).json(updatedUser)
}

module.exports.me = me
module.exports.credit = credit
