const express = require("express");

const clothingController = require("../controllers/clothingItem");

const router = express.Router();

router.get("/", clothingController.getClothingItems);

router.post("/", clothingController.createClothingItem);

router.delete("/:itemId", clothingController.deleteClothingItem);

module.exports = router;
