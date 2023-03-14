require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./api/router/router");
const blockchainRouter = require("./dev/router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = process.env.PORT || 3002;

app.use(
  cors({ origin: process.env.CORS_ORIGIN || "http://192.168.1.109:3000" })
);

app.use("/", router, blockchainRouter);

app.listen(port, () => {
  console.log(`listening at port ${port} ........`);
});
