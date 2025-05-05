const router = require("express").Router();

const likeController = require("../controllers/likes");

// const { idValidator } = require("../middlewares/validation");

router.put("/:itemId/likes", likeController.likeItem);
router.delete("/:itemId/likes", likeController.dislikeItem);

module.exports = router;
