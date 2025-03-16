const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  UNAUTHORIZED,
  DATA_CONFLICT,
  FORBIDDEN,
} = require("./errorConsts");

const serverError = (res) => {
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
    .send({ message: `Document: ${req.params.userId} does not exist.` });
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

const duplicateEmail = (res) => {
  res.status(DATA_CONFLICT).send({ message: "Email has already been used." });
};

const authorizationError = (res) => {
  res.status(UNAUTHORIZED).send({ message: "Authorization Error" });
};

const forbidden = (res) => {
  res.status(FORBIDDEN).send({ message: "Action not allowed" });
};

module.exports = {
  serverError,
  userNotFound,
  validationError,
  itemNotFound,
  documentNotFound,
  unknownRoute,
  duplicateEmail,
  authorizationError,
  forbidden,
};
