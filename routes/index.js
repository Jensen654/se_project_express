const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");
const error = require("../utils/errors");
const {createUser, login} = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.use("/items/:itemId/likes", likeRouter);

router.use((req, res) => {
  error.unknownRoute(res);
});
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
