const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema ({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.objectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model("CartItem", cartItemSchema);