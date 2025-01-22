const router = require("express").Router();

const likeController = require("../controllers/likes");

router.put("/:itemId/likes", likeController.likeItem);
router.delete("/:itemId/likes", likeController.dislikeItem);

module.exports = router;
