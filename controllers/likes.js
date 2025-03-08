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
      res.send({ message: `Item ${item._id} has been liked.` });
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
};

const dislikeItem = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send({ message: `Item ${item._id} has been disliked.` });
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
};

module.exports = { likeItem, dislikeItem };
