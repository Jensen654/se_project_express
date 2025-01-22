const ClothingItems = require("../models/clothingItem");
const error = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItems.find({})
    .orFail()
    .then((clothingItems) => res.send(clothingItems))
    .catch((err) =>
      res.status(500).send({ error: `Error Fetching Items: ${err}` })
    );
};

const createClothingItem = (req, res) => {
  const owner = req.user._id;
  const { name, imageUrl, weather } = req.body;
  ClothingItems.create({
    name,
    imageUrl,
    weather,
    owner,
  })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        error.validationError(res, err);
      } else if (err.name === "CastError") {
        error.itemNotFound(req, res);
      } else {
        error.serverError(res, err);
      }
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItems.findByIdAndRemove(req.params.itemId)
    .orFail()
    .then((item) => {
      res.send({ message: `${item} has been deleted.` });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        error.validationError(res, err);
      } else if (err.name === "CastError") {
        error.itemNotFound(req, res);
      } else if (err.name === "DocumentNotFoundError") {
        error.documentNotFound(req, res);
      } else {
        error.serverError(res, err);
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
