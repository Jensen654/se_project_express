const mongoose = require("mongoose");
const ClothingItems = require("../models/clothingItem");
const error = require("../utils/errors");
const BadRequestError = require("../errors/BadRequestError");

const getClothingItems = (req, res, next) => {
  ClothingItems.find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch((err) => {
      next(err);
    });
};

const createClothingItem = (req, res, next) => {
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
        next(
          new BadRequestError(
            "One of the provided inputs does not conform to database standards"
          )
        );
      } else {
        next(err);
      }
    });
};

const deleteClothingItem = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
    return error.validationError(res);
  }

  try {
    const clothingItem = await ClothingItems.findById(req.params.itemId);

    if (!clothingItem) {
      return error.documentNotFound(req, res);
    }

    if (clothingItem.owner.equals(req.user._id)) {
      return ClothingItems.findByIdAndDelete(req.params.itemId)
        .orFail()
        .then((item) => {
          res.send({ message: `${item._id} has been deleted.` });
        })
        .catch((err) => {
          if (err.name === "CastError") {
            return error.itemNotFound(req, res);
          }
          if (err.name === "DocumentNotFoundError") {
            return error.documentNotFound(req, res);
          }
          return error.serverError(res);
        });
    }
    return error.forbidden(res);
  } catch (err) {
    console.error("error deleting clothingitem:", err);
    if (err.name === "CastError") {
      return error.itemNotFound(req, res);
    }
    return error.serverError(res);
  }
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
