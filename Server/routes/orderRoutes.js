const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/roleMiddleware");

router.post("/", auth, orderController.createOrder);
router.get("/my-orders", auth, orderController.getMyOrders);


module.exports = router;