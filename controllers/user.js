const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const error = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      error.serverError(res);
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
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

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 4);
    User.create({ name, avatar, email, password: hashedPassword })
      .then((user) => {
        res.status(201).send({
          data: {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          },
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          error.validationError(res);
        } else if (err.code === 11000) {
          error.duplicateEmail(res);
        } else {
          error.serverError(res);
        }
      });
  } catch (err) {
    error.serverError(res);
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      error.validationError(res);
    });
};

const updateUserProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((newDoc) => {
      res.send({ data: newDoc });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        error.validationError(res);
      } else if (err.name === "DocumentNotFoundError") {
        error.documentNotFound(req, res);
      } else {
        error.serverError(res);
      }
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  login,
  updateUserProfile,
};
