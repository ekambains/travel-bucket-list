import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import User from './models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BucketList from './models/bucketList.model.js';
import mongoose from 'mongoose';
import authenticateToken from './middlewares/authenticateToken.js';

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/",(req, res) => {
    res.send("<h1>Jatt</h1>");
});

app.post("/signup", async(req, res) => {
    try {
        const user = req.body;
        if(!user.username || !user.email || !user.password) {
            return res.status(400).json({success: false, message: "Please provide all fields"});
        }
        user.password =  await bcrypt.hash(user.password, 10);
        console.log(user.password);
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    }
    catch(error) {
        console.error("Error in Create User: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.username }]
        });

        if(!user) {
            return res.status(404).json({success: false, message: "User doesn't exist."});
        }

        if(!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({success: false, message: "Incorrect Password"});
        }

        const payload = {id: user._id, username: user.username, email: user.email};
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({success: true, message: "Login Successful", accessToken: accessToken});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "An error occured during login."})
    }
});


app.get("/api/bucket", authenticateToken, async(req, res) => {
    try {
        const bucketList = await BucketList.find({userId: req.user.id});
        res.status(200).json({success: true, data: bucketList});
    } catch (error) {
        console.log("Error in fetching buckets: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.post("/api/bucket", authenticateToken, async(req, res) => {
    try {
        const bucket = req.body;
        if(!bucket.destination || !bucket.description || !bucket.visited) {
            return res.status(400).json({success: false, message: "Please provide all fields."});
        }
        const newBucket = new BucketList({userId: req.user.id, destination: bucket.destination, description: bucket.description, visited: bucket.visited});
        await newBucket.save();
        return res.status(201).json({success: true, data: newBucket});
    } catch(error) {
        console.error("Error in creating bucket: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.put("/api/bucket/:id", authenticateToken, async(req, res) => {
    const { id } = req.params;
    const bucket = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Bucket ID."});
    }

    try {
        const updatedBucket = await BucketList.findByIdAndUpdate(id, bucket, {new: true});
        res.status(200).json({success: true, data: updatedBucket});
    } catch (error) {
        console.error("Error in updating bucket is: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.delete("/api/bucket/:id", authenticateToken, async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Bucket ID."});
    }

    try {
        await BucketList.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted Successfully."});
    } catch (error) {
        console.error("Error in deleting bucket: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});