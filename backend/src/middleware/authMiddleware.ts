import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ status: "Access denied", msg: "User is not authorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    // req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      msg: "Unauthorized",
    });
  }
};
export default verifyToken