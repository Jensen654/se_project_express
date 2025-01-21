const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.use("/items/:itemId/likes", likeRouter);

module.exports = router;
