import express from "express";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import userRouter from "./routes/user";

mongoose
  .connect(
    "mongodb+srv://mahesh123:mahesh123@kaloraat.byhnu.mongodb.net/Suprime?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected successfully...");
  })
  .catch((err) => {
    console.log("DB connection failed..............");
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(expressValidator());
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Hello user");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
