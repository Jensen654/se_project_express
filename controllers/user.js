const user = require("../models/user");
const Users = require("../models/user");
const error = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  Users.find({})
    .orFail()
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      error.serverError(res);
    });
};

const getUser = (req, res) => {
  Users.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        error.userNotFound(req, res);
      } else if (err.name === "DocumentNotFoundError") {
        error.documentNotFound(req, res);
      } else {
        error.serverError(res);
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  const hashedPassword = bcrypt.hash(password, 4);

  Users.create({ name, avatar, email, hashedPassword })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        error.validationError(res);
      } else if (err.code === 11000) {
        error.duplicateEmail(res);
      } else {
        error.serverError(res);
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  Users.findUserByCredentials(email, password)
    .orFail()
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      error.authorizationError(res);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
};
