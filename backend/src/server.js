import express from "express";
import dotenv from "dotenv";
import registerRoute from "./api/routers/register.js";
import loginRoute from "./api/routers/login.js";
import diaryRoute from "./api/routers/diary.js";
import connectDB from "./config/db.js";
import cors from "cors";
dotenv.config();

connectDB();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use("/", registerRoute);
app.use("/", loginRoute);
app.use("/", diaryRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend of Diary Web app full stack!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
