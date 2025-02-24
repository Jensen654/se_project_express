const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likes");

router.put("/", likeController.likeItem);

module.exports = router;
