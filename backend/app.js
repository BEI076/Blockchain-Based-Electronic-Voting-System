require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./api/router/router");
const blockchainRouter = require("./dev/router");
app.use(express.json());
const cors = require("cors");

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.120:3000');
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = process.argv[2];

const SynchronizeNodes = require("./config/synchronizeNodes");
const node = new SynchronizeNodes();

// app.use("/", router);
app.use("/", router, blockchainRouter);

// const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening at port ${port} ........`);
});
