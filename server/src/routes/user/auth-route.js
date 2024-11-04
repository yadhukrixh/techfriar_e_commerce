import express from 'express';
import { loginController, signupController } from '../../modules/user/controllers/auth-controller.js';


const router = express.Router();

router.post("/login",loginController);

router.post("/signUp",signupController);

export default router;