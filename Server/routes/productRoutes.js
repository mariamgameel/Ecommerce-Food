const router = require("express").Router();
const ctrl = require("../controllers/productController");

router.get("/", ctrl.getAllProducts);
router.get("/:id", ctrl.getProduct);
router.post("/", auth, authorize("admin"), ctrl.createProduct);
router.delete("/:id", auth, authorize("admin", ctrl.deleteProduct));

module.exports = router;