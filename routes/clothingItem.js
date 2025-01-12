const express = require("express");
const router = express.Router();
const clothingController = require("../controllers/clothingItem");
const ClothingItems = require("../utilities/clothingItem");

router.use("/items/:itemId", (req, res) => {
  const validItem = ClothingItems.findById(req.params.itemId);

  if (!validItem) {
    res.status(404).send({
      message: "Requested resource not found",
    });
  }
});

router.get("/items", clothingController.getClothingItems);

router.post("/items", clothingController.createClothingItem);

router.delete("/items/:itemId", clothingController.deleteClothingItem);

module.exports = router;
