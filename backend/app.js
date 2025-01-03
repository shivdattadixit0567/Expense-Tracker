require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const errorHandler = require("./middlewares/errorHandler");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
