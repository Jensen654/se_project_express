const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      }
    },
    unique: true,
  },
  password: {
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  this.findOne({email})
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect Email or Password"));
    }

    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect Email or Password"));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("Users", userSchema);
