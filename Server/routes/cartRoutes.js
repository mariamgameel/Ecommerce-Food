const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const {
    addToCartValidation,
    updateItemValidation
} = require("../validators/cartValidator");

router.post("/", auth, validate(addToCartValidation), cartController.addToCart);
router.get("/", auth, cartController.getCart);
router.patch("/:productId", auth, validate(updateItemValidation), cartController.updateItem);
router.delete("/:productId", auth, cartController.deleteItem);
router.delete("/", auth, cartController.clearCart);

module.exports = router;