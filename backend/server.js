import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import bucketRouter from './routes/bucket.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/api/bucket", bucketRouter);

app.use("/api/user", userRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});