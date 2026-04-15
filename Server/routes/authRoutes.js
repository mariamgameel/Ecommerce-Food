const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {registerSchema, loginSchema} = require("../validators/userValidator");
const userController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

router.post("/register", validate(registerSchema), userController.registerUser);
router.post("/login", validate(loginSchema), userController.loginUser);
router.get("/", auth, isAdmin, userController.getAllUsers);

module.exports = router;