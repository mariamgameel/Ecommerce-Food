const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id})
        .populate("items.product");
        if(!cart || cart.items.length === 0) {
            return res.status(400).json({msg: "Cart is empty"});
        }
        const items = cart.items.map(item =>({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));
        const totalPrice = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const order = await Order.create({
            user: req.user.id,
            items,
            totalPrice
        });
        cart.items = [];
        await cart.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user.id})
        .populate("items.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

module.exports = {
    createOrder,
    getMyOrders,
};