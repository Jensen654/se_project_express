const Users = require("../models/user");
const error = require("../utilities/errors");

const getUsers = (req, res) => {
  Users.find({})
    .orFail()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      error.serverError(res, err);
    });
};

const getUser = (req, res) => {
  Users.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      console.error(err.name);
      if (err.name === "ValidationError") {
        error.validationError(res, err);
      } else if (err.name === "CastError") {
        error.userNotFound(req, res);
      } else {
        error.serverError(res, err);
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  Users.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        error.validationError(res, err);
      } else if (err.name === "CastError") {
        error.userNotFound(req, res);
      } else {
        error.serverError(res, err);
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
