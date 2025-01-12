const ClothingItems = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItems.find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch((err) =>
      res.status(500).send({ error: `Error Fetching Items: ${err}` })
    );
};

const createClothingItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;
  ClothingItems.create({
    name,
    imageUrl,
    weather,
  })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      res.status(500).send({ error: `Error Creating Item ${err}` });
      console.log(err);
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItems.findByIdAndRemove(req.params.itemId)
    .then((item) => {
      res.send({ message: `${item} has been deleted.` });
    })
    .catch((err) => {
      res.status(500).send({ error: `Error Deleting Item ${err}` });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
