const user = require("../models/user");
const Users = require("../models/user");
const error = require("../utils/errors");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../utils/config");

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
  const { name, avatar, email, password } = req.body;

  const hashedPassword = bcrypt.hash(password, 4);

  Users.create({ name, avatar, email, hashedPassword })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        error.validationError(res, err);
      } else if (err.name === "CastError") {
        error.userNotFound(req, res);
      } else if(err.status === "11000") {
        error.duplicateEmail(res)
      } 
      else {
        error.serverError(res, err);
      }
    });
};

const login = (req, res) => {
  const {email, password} = req.body;

  Users.findUserByCredentials(email, password)
  .orFail()
  .then((user) => {
    const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: "7d",});
    res.send({token});
  })
  .catch((err) => {
    res.status(401).send(err);
  });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
};
