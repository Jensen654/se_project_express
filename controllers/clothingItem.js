const ClothingItems = require("../models/clothingItem");
const error = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItems.find({})
    .orFail()
    .then((clothingItems) => res.send(clothingItems))
    .catch(() => {
      error.serverError(res);
    });
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
        error.validationError(res);
      } else {
        error.serverError(res);
      }
    });
};

const deleteClothingItem = async (req, res) => {
  const clothingItem = await ClothingItems.findById(req.params.itemId);
  console.log(clothingItem.owner);
  console.log(req.user._id);
  if (clothingItem.owner.equals(req.user._id)) {
    ClothingItems.findByIdAndDelete(req.params.itemId)
      .orFail()
      .then((item) => {
        res.send({ message: `${item._id} has been deleted.` });
      })
      .catch((err) => {
        if (err.name === "CastError") {
          error.itemNotFound(req, res);
        } else if (err.name === "DocumentNotFoundError") {
          error.documentNotFound(req, res);
        } else {
          error.serverError(res);
        }
      });
  } else {
    error.forbidden(res);
  }
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
