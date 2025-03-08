const router = require("express").Router();

const userController = require("../controllers/user");

router.get("/", userController.getUsers);

router.get("/:userId", userController.getUser);

router.post("/", userController.createUser);

module.exports = router;
