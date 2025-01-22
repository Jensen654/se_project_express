const router = require("express").Router();

const clothingController = require("../controllers/clothingItem");

router.get("/", clothingController.getClothingItems);

router.post("/", clothingController.createClothingItem);

router.delete("/:itemId", clothingController.deleteClothingItem);

module.exports = router;
