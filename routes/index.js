const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const likeRouter = require("./likes");
const error = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.use("/items", likeRouter);
router.use((req, res) => {
  error.unknownRoute(res);
});

module.exports = router;
