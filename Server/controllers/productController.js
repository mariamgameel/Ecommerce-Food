const product = require("../models/Product");

const getAllProducts = async (req, res) => {
   try {
    const products = await product.find();
    res.status(200).json(products);
   } catch (error) {
    res.status(500).json({msg: error.message});
   }
};

const getSingleProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await product.findById(productId);
        if(!product) {
            return res.status(404).json({msg: "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct
};