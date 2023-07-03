const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");


const app = express();

app.use(express.json());
app.use("/images", express.static("images"));
app.use(cors());
app.use(morgan("dev"));
app.use(require("./routes"));



const connectAndStartServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://Mansur:1954@cluster0.xyb0huh.mongodb.net/partners");
    app.listen(3000, () => {
      console.log(`Успешное подключение к порту ${3000}`);
    });
  } catch (e) {
    console.log(`Ошибка при подключении к порту ${3000}`);
  }
};
connectAndStartServer();