const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/authMiddleware");

router.post("/items", auth, cartController.addToCart);
router.get("/", auth, cartController.getCart);
router.patch("/items/:itemId", auth, cartController.updateItem);
router.delete("/items/:itemId", auth, cartController.deleteItem);
router.delete("/", auth, cartController.clearCart);

module.exports = router;