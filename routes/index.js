const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");
const { createUser, login } = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");
const {
  userInfoBodyValidator,
  loginValidator,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", authMiddleware, userRouter);
router.use("/items", clothingRouter);
router.use("/items", authMiddleware, likeRouter);
router.post("/signin", loginValidator, login);
router.post("/signup", userInfoBodyValidator, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Route does not exist."));
});

module.exports = router;
