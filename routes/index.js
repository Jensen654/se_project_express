const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");
const error = require("../utils/errors");
const { createUser, login } = require("../controllers/user");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.use("/items/:itemId/likes", likeRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  error.unknownRoute(res);
});

module.exports = router;
