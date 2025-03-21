import express from 'express';
import { register } from '../controllers/register.js';

const router = express.Router();

// router.post('/register', register);
router.route("/api/auth/register").post(register);



export default router;