import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const auth: RequestHandler = (req: any, res, next) => {
  // Get Token from header
  const token = req.header("Authorization");

  // check if no token
  if (!token) {
    return res.status(401).json({
      message: "No token , authorization denied",
    });
  }

  // verify token
  try {
    const decoded: any = jwt.verify(token, "SECRETKEYBYMAHESH");

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export { auth };
