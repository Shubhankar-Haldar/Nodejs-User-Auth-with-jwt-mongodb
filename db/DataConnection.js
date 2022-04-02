const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("database connected...."))
  .catch(() => console.log("database not connected.."));
