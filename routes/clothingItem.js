const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItem");

const {
  clothingItemBodyValidator,
  idValidator,
} = require("../middlewares/validation");

router.get("/", getClothingItems);

router.post("/", authMiddleware, clothingItemBodyValidator, createClothingItem);

router.delete("/:itemId", authMiddleware, idValidator, deleteClothingItem);

module.exports = router;
