const ClothingItems = require("../models/clothingItem");
const error = require("../utils/errors");

const likeItem = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send({ message: `Item ${item} has been liked.` });
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

const dislikeItem = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send({ message: `Item ${item} has been disliked.` });
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

module.exports = { likeItem, dislikeItem };
