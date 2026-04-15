const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

const addToCart = async (req, res) => {
    try {
        const {productId, quantity} = req.body;

        let cart = await Cart.findOne({user: req.user.id});

        if (!cart) {
            cart = await Cart.create({user: req.user.id, items: []});
        }

        if (item) {
            item.quantity += quantity || 1;
            await item.save();
        } else {
            item = await CartItem.create ({
                user: req.user.id,
                product: productId,
                quantity: quantity || 1
            });
            cart.items.push(item._id);
            await cart.save();
        }

        res.status(201).json(item);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id})
        .populate({
            path: "items",
            populate: {path: "product"}
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const deleteItem = async (req, res) => {
    try {
        const {itemId} = req.params;
        await CartItem.findByIdAndDelete(itemId);
        await Cart.updateOne(
            {user: req.user.id},
            {$pull: {items: itemId}}
        );
        res.status(200).json({msg: "Item deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id});
        if(!cart) {
            return res.status(404).json({msg: "Cart not found"});
        }
        cart.items = [];
        await cart.save();
        res.json({msg: "Cart cleared"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

module.exports = {
    addToCart,
    getCart,
    deleteItem,
    clearCart
};