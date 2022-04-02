require("dotenv").config();
require("./db/DataConnection");

const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// userService router
const userRouter = require("./api/UserController/router");
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running port no ${process.env.PORT}`);
});
