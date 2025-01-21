const express = require("express");
const router = express.Router();
const clothingController = require("../controllers/clothingItem");
const ClothingItems = require("../models/clothingItem");

// router.use("/:itemId", (req, res) => {
//   const validItem = ClothingItems.findById(req.params.itemId);

//   if (!validItem) {
//     res.status(400).send({
//       message: "Requested resource not found",
//     });
//   }
// });

router.get("/", clothingController.getClothingItems);

router.post("/", clothingController.createClothingItem);

router.delete("/:itemId", clothingController.deleteClothingItem);

module.exports = router;
