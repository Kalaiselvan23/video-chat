import { Request, Response } from "express";
import { LoginUserSchema, UserSchema, UserType } from "../zod";
import bcrypt from "bcrypt";
import pool from "../db";
import jwt from "jsonwebtoken";
import brcypt from "bcrypt";
export const signup = async (req: Request, res: Response) => {
  try {
    const user: UserType = req.body;
    UserSchema.parse(user);
    console.log(user);
    const { username, email, password } = user;
    const hash = bcrypt.genSalt(10).then((salt) => {
      return bcrypt.hash(password, salt);
    });
    const hashedPassword = await hash;
    console.log(hashedPassword);
    const query =
      "INSERT INTO USERS(username,email,password_hash) VALUES($1,$2,$3)";
    const result = await pool.query(query, [username, email, hashedPassword]);
    res.status(201).json({
      status: "fail",
      message: "User created successfully",
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(400).json({ error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const loginData = req.body;
  LoginUserSchema.parse(loginData);
  const { username, password } = loginData;
  const query = "SELECT * FROM USERS WHERE username=$1";
  const user = await pool.query(query, [username]);
  if (user.rows.length === 0) {
    res.status(404).json({
      status: "fail",
      msg: `No user found in the username of ${username}`,
    });
  }
  const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
  if (isMatch) {
    const tokenPayload = username;
    const token = jwt.sign(tokenPayload, String(process.env.JWT_SECRET));
    console.log(token);
    return res.status(200).json({
      status: "success",
      msg: "Login Successful",
      token,
    });
  }
  res.status(500).json({
    status: "fail",
    msg: "Invalid password",
  });
};
