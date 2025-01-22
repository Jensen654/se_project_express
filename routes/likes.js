const express = require("express");

const likeController = require("../controllers/likes");

const router = express.Router();

router.put("/:itemId/likes", likeController.likeItem);
router.delete("/:itemId/likes", likeController.dislikeItem);

module.exports = router;
