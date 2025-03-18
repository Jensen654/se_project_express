const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const mainRouter = require("./routes/index");

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database connection error"));

const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
