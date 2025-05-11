const ClothingItems = require("../models/clothingItem");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");

const likeItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequestError(
            `The Provided ID is invalid: ${req.params.itemId}`
          )
        );
      } else if (err.name === "DocumentNotFoundError") {
        next(
          new NotFoundError(`Document: ${req.params.userId} does not exist.`)
        );
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequestError(
            `The Provided ID is invalid: ${req.params.itemId}`
          )
        );
      } else if (err.name === "DocumentNotFoundError") {
        next(
          new NotFoundError(`Document: ${req.params.userId} does not exist.`)
        );
      } else {
        next(err);
      }
    });
};

module.exports = { likeItem, dislikeItem };
