const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()

const superAdminRouter = require("./router/super-admin.router");
const serviceAgentRouter = require('./router/service-agent')
const customerRouter = require('./router/customer-router')

const port = 3000;

app.use(express.json());
app.use("/super-admin", superAdminRouter);
app.use("/service-agent", serviceAgentRouter);
app.use("/customer", customerRouter);



app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connect to server and database ", process.env.PORT);
    })
    .catch((error) => {
      console.log(error);
    });
});
