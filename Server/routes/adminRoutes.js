const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/roleMiddleware");
const validate = require("../middleware/validationMiddleware");
const {
    createProductValidation,
    updateProductValidation,
    idValidation,
    userIdValidation
} = require("../validators/adminValidator");
const {
    updateOrderStatusValidation
} = require("../validators/orderValidator");

router.get("/users", auth, admin, adminController.getAllUsers);
router.delete("/users/:userId", auth, admin, validate(userIdValidation), adminController.deleteUser);

router.post("/products", auth, admin,validate(createProductValidation) , adminController.createProduct);
router.patch("/products/:productId", auth, admin, validate(updateProductValidation), adminController.updateProduct);
router.delete("/products/:productId", auth, admin, validate(idValidation), adminController.deleteProduct);

router.patch("/orders/:orderId", auth, admin, validate(updateOrderStatusValidation), adminController.updateOrderStatus);
router.get("/orders", auth, admin, adminController.getAllOrders);

module.exports = router;