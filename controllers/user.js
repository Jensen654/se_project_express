const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequestError(
            `The provided user ID is invalid: ${req.params.userId}`
          )
        );
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(`User: ${req.params.userId} does not exist.`));
      } else {
        next(err);
      }
    });
};

const createUser = async (req, res, next) => {
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
          next(
            new BadRequestError(
              `The provided info does not conform to database standards/requirements.`
            )
          );
        } else if (err.code === 11000) {
          next(new ConflictError("Email has already been used."));
        } else {
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new BadRequestError("The password and email fields are required.")
    );
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect Email or Password") {
        return next(new UnauthorizedError("Incorrect Email or Password"));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
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
        next(
          new BadRequestError(
            `The provided info does not conform to database standards/requirements.`
          )
        );
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(`User: ${req.params.userId} does not exist.`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUserProfile,
};
