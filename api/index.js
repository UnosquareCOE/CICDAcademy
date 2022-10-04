const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { stringUtils } = require("./utils");

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  const { input } = req.query;
  res.send(stringUtils.reverseString(input ?? "Hello World 1234!"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
