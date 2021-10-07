"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const morgan = require("morgan");
const cors = require("cors");

const middleWare = require("./middlware/errorhandel");
const hello = require("./routes/hello");
const items = require("./routes/get_items");


app.use(cors());
app.use(morgan());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use("/hello", hello);
app.use("/", items);

app.use(middleWare.middleWare),
app.use(middleWare.notFoundError),
app.use(middleWare.errorResult);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.listen(port, () => console.log(`Example API listning on port ${port}!`));
