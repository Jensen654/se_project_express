const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("./errorConsts");

const serverError = (res, err) => {
  res.status(DEFAULT).send({ message: "An error has occured on the server." });
};

const userNotFound = (req, res) => {
  res
    .status(BAD_REQUEST)
    .send({ message: `The provided ID is invalid: ${req.params.userId}` });
};

const documentNotFound = (req, res) => {
  res
    .status(NOT_FOUND)
    .send({ message: `User: ${req.params.userId} does not exist.` });
};

const itemNotFound = (req, res) => {
  res
    .status(BAD_REQUEST)
    .send({ message: `The Provided ID is invalid: ${req.params.itemId}` });
};

const validationError = (res) => {
  res.status(BAD_REQUEST).send({
    message: `The provided info does not conform to database standards/requirements.`,
  });
};

const unknownRoute = (res) => {
  res.status(NOT_FOUND).send({ message: "Route does not exist." });
};

module.exports = {
  serverError,
  userNotFound,
  validationError,
  itemNotFound,
  documentNotFound,
  unknownRoute,
};
