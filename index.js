const express = require("express");
const mongoose = require("mongoose");
const app = express();

const superAdminRouter = require("./router/super-admin.router");
const serviceAgentRouter = require('./router/service-agent')

const port = 3000;

app.use(express.json());
app.use("/super-admin", superAdminRouter);
app.use("/service-agent", serviceAgentRouter);

app.listen(port, () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/car-service", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connect to server and database ", port);
    })
    .catch((error) => {
      console.log(error);
    });
});
