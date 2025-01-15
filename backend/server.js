import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import User from './models/user.model.js';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/",(req, res) => {
    res.send("<h1>Jatt</h1>");
})

app.post("/user", async(req, res) => {
    const user = req.body;
    if(!user.username || !user.email || !user.password) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }
    user.password =  await bcrypt.hash(user.password, 10);
    console.log(user.password);
    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    }
    catch(error) {
        console.error("Error in Create User: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});