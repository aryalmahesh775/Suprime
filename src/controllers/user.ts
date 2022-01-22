import { RequestHandler } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(403).json({
        error: "Email is already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({
      message: "Signup success, please login.",
    });
  } catch (err) {
    console.log(err);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found...",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Not valid credentials.",
      });
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        user: user.id,
      },
      "SECRETKEYBYMAHESH",
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token);
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUser = await User.find().select("_id email name");
    res.json({ allUser });
  } catch (err) {
    console.log(err);
  }
};

export const signout: RequestHandler = (req, res) => {
  res.clearCookie("jwt");
  return res.json({ message: "Signout success" });
};
