import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/students' , studentRoutes);

app.get("/", (req, res) => {
    res.send('Student Management API is running!');
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})