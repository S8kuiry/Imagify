

import { loginUser,paymentRazorpay,registerUser, userCredit, verifyRazorpay } from "../controllers/userController.js";
import express from "express";
import { userAuth } from "../middleware/auth.js";

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredit)
userRouter.post('/pay-razor',userAuth,paymentRazorpay)
userRouter.post('/verify-razor',verifyRazorpay)

export default userRouter;