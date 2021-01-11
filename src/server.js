import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import router from "./routes/index";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// connect to MongoDB database
connectDB();


//routes
app.use("/", router);

// Home page
app.get("/", (req, res) => {
    res.send("Welcome To The Home Page.");
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

export default app;
