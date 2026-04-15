const product = require("../models/Product");

const getAllProducts = async (req, res) => {
   try {
     const { search, category } = req.query;

    let filter = {};

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }
    if (category) {
        filter.category = category;
    }
    const products = await product.find(filter);

    res.status(200).json(products);

   } catch (error) {
    res.status(500).json({msg: error.message});
   }
};

const getProduct = async (req, res) => {
    try {
        const product = await product.findById(req.params.id);
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

module.exports = {
    getAllProducts,
    getProduct
};