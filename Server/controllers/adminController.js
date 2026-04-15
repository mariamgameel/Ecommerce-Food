const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({msg: "User deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await Product.findByIdAndUpdate(
            productId,
            req.body,
            {new: true}
        );
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({msg: "Product deleted"});
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("items.product");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
};