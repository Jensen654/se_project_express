const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/test", (req, res) => {
  res.send("yo whats up bro");
});

module.exports = router;
