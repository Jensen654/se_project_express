const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItem");

router.get("/", getClothingItems);

router.post("/", authMiddleware, createClothingItem);

router.delete("/:itemId", authMiddleware, deleteClothingItem);

module.exports = router;
