const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const Users = require("../utilities/user");

router.use("/users/:userId", (req, res) => {
  const validUser = Users.findById(req.params.userId);

  if (!validUser) {
    res.status(404).send({ message: "Requested resource not found" });
  }
});

router.get("/test", (req, res) => {
  res.send("yo whats up bro");
});

router.get("/", userController.getUsers);

router.get("/:userId", userController.getUser);

router.post("/", userController.createUser);

module.exports = router;
