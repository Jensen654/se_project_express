const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");
const {createUser, login} = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.use("/items/:itemId/likes", likeRouter);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
