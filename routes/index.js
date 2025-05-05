const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");
const error = require("../utils/errors");
const { createUser, login } = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");
const {
  userInfoBodyValidator,
  loginValidator,
} = require("../middlewares/validation");

router.use("/users", authMiddleware, userRouter);
router.use("/items", clothingRouter);
router.use("/items", authMiddleware, likeRouter);
router.post("/signin", loginValidator, login);
router.post("/signup", userInfoBodyValidator, createUser);

router.use((req, res) => {
  error.unknownRoute(res);
});

module.exports = router;
