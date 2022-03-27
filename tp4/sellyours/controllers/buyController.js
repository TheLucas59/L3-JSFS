const userSchema = require('../models/User').model
const itemSchema = require('../models/Item').model


const buyItem = async (req, res) => {
    const itemId = req.params.itemId
    const buyerId = req.userId
    const sellerId = req.body.sellerId

    const item = await itemSchema.findById(itemId)
    const buyer = await userSchema.findById(buyerId)
    const seller = await userSchema.findById(sellerId)

    const price = item.price
    if(buyer.balance > price) {
        const newBuyerBalance = { balance : buyer.balance - price }
        const newSellerBalance = { balance : seller.balance + price }

        const updatedBuyer = await userSchema.findByIdAndUpdate(buyerId, newBuyerBalance, { new : true })
        const updatedSeller = await userSchema.findByIdAndUpdate(sellerId, newSellerBalance, { new : true })

        const deleteItem = await itemSchema.findByIdAndDelete(itemId)

        res.status(200).json(item)
    }
    else {
        res.status(401).json( { message : "Vous n'avez pas assez d'argent pour acheter cet objet."} )
    }
}

module.exports.buyItem = buyItem