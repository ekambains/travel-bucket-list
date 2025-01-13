import express from 'express';
import { createUser } from '../backend/controllers/user.controller';

const router = express.Router();

router.post('/', createUser);

export default router;