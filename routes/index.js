const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");
const error = require("../utils/errors");
const { createUser, login } = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");

router.use("/users", authMiddleware, userRouter);
router.use("/items", clothingRouter);
router.use("/items", authMiddleware, likeRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  error.unknownRoute(res);
});

module.exports = router;
