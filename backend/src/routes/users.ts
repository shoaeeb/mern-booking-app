import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

//api/users/register post request
router.post(
  "/register",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password length of 6 is required").isLength({ min: 6 }),
    check("lastName", "Last Name is Required").isString(),
    check("firstName", "First Name is Required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User Already Exists" });
      }
      const newUser = new User(req.body);
      await newUser.save();
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, //1d in ms
      });
      res.status(201).json({message:"User Registered Ok"}); //Created
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
