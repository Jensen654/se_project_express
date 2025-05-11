const router = require("express").Router();

const { likeItem, dislikeItem } = require("../controllers/likes");

const { idValidator } = require("../middlewares/validation");

router.put("/:itemId/likes", idValidator, likeItem);
router.delete("/:itemId/likes", idValidator, dislikeItem);

module.exports = router;
