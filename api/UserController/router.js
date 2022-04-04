const UserController = require("./controller");
const router = require("express").Router();
const jwt = require("../../middleware/jwt");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/:id", jwt.verifyToken, UserController.update);
router.delete("/:id", jwt.verifyToken, UserController.delete);
router.get("/:id", jwt.verifyToken, UserController.findById);

module.exports = router;
