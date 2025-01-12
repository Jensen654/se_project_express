const Users = require("../models/user");

const getUsers = (req, res) => {
  Users.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) =>
      res.status(500).send({ error: `Error fetching users: ${err}` })
    );
};

const getUser = (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({ error: `Error fetching user: ${err}` })
    );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  Users.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) =>
      res.status(500).send({ error: `Error creating user: ${err}` })
    );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
