const serverError = (res, err) => {
  res.status(500).send({ message: err.message });
};

const userNotFound = (req, res) => {
  res
    .status(404)
    .send({ message: `User: ${req.params.userId} does not exist.` });
};

const itemNotFound = (req, res) => {
  res
    .status(404)
    .send({ message: `Item: ${req.params.itemId} does not exist.` });
};

const validationError = (res, err) => {
  res.status(400).send({ message: err.message });
};

module.exports = { serverError, userNotFound, validationError, itemNotFound };
