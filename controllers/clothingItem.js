const mongoose = require("mongoose");
const ClothingItems = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddernError = require("../errors/ForbiddenError");

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

const deleteClothingItem = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
    return next(new BadRequestError("Clothing ID is invalid."));
  }

  try {
    const clothingItem = await ClothingItems.findById(req.params.itemId);

    if (!clothingItem) {
      return next(new NotFoundError("Clothing item not found in database."));
    }

    if (clothingItem.owner.equals(req.user._id)) {
      return ClothingItems.findByIdAndDelete(req.params.itemId)
        .orFail()
        .then((item) => {
          res.send({ message: `${item._id} has been deleted.` });
        })
        .catch((err) => {
          if (err.name === "CastError") {
            return next(
              new BadRequestError(
                "Clothing item ID does not conform to database standards."
              )
            );
          }
          if (err.name === "DocumentNotFoundError") {
            return next(
              new NotFoundError("Clothing item ID not contained in database.")
            );
          }
          return next(err);
        });
    }
    return next(
      new ForbiddernError("You do not have access to delete this file.")
    );
  } catch (err) {
    console.error("error deleting clothingitem:", err);
    if (err.name === "CastError") {
      return next(
        new BadRequestError(
          "Could not delete clothing item, Clothing item ID does not conform to database standards."
        )
      );
    }
    return next(err);
  }
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
