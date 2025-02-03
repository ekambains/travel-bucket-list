import express from 'express'
import authenticateToken from '../middlewares/authenticateToken.js';
import { createBucket, deleteBucket, getBucket, updatedBucket } from '../controllers/bucketList.controller.js';

const bucketRouter = express.Router();

bucketRouter.get("/", authenticateToken, getBucket);

bucketRouter.post("/", authenticateToken, createBucket);

bucketRouter.put("/:id", authenticateToken, updatedBucket);

bucketRouter.delete("/:id", authenticateToken, deleteBucket);

export default bucketRouter;