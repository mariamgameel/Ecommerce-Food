const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
    try {
        const {productId, quantity} = req.body;
        let cart = await Cart.findOne({user: req.user.id});
        if(!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: []
            });
        }
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );
        if(existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1
            });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id})
        .populate("items.product");
        if(!cart) {
            return res.status(404).json({msg: "Cart not found"});
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const updateItem = async (req, res) => {
    try {
        const {productId} = req.params;
        const {quantity} = req.body;
        const cart = await Cart.findOne({user: req.user.id});
        if(!cart) {
            return res.status(404).json({msg: "Cart not found"});
        }
        const item = cart.items.find(
            item => item.product.toString() === productId
        );
        if(!item) {
            return res.status(404).json({msg: "Item not found"});
        }
        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const deleteItem = async (req, res) => {
    try {
        const {productId} = req.params;
        const cart = await Cart.findOne({user: req.user.id});
        if(!cart) {
            return res.status(404).json({msg: "Cart not found"});
        }
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );
        await cart.save();
        res.status(200).json({msg: "Item removed successfully", cart});
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
        res.status(200).json({msg: "Cart cleared"}); 
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

module.exports = {
    addToCart,
    getCart,
    updateItem,
    deleteItem,
    clearCart
};