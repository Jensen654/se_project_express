const router = require("express").Router();

const likeController = require("../controllers/likes");

const { idValidator } = require("../middlewares/validation");

router.put("/:itemId/likes", idValidator, likeController.likeItem);
router.delete("/:itemId/likes", idValidator, likeController.dislikeItem);

module.exports = router;
