const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const Users = require("../models/user");

// router.use("/:userId", (req, res) => {
//   const validUser = Users.findById(req.params.userId);

//   if (!validUser) {
//     res.status(400).send({ message: "Requested resource not found" });
//   } else {
//     res.status(500).send({ message: "An issue with the server occured" });
//   }
// });

router.get("/test", (req, res) => {
  res.send("yo whats up bro");
});

router.get("/", userController.getUsers);

router.get("/:userId", userController.getUser);

router.post("/", userController.createUser);

module.exports = router;
