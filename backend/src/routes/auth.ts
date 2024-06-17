import express, { Request, Response } from "express"
import { signIn,signup } from "../controllers/authController";
import verifyToken from "../middleware/authMiddleware";
const authRouter=express.Router();
authRouter.post("/signup",signup);
authRouter.post("/signin",signIn);
authRouter.get("/sample",verifyToken,(req:Request,res:Response)=>{
    res.json({
        msg:"hello world"
    })
})
export default authRouter;