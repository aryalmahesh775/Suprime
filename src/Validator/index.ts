// import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express";

// const userSignUpValidator: RequestHandler = (req, res, next) => {
//   exports.userSignUpValidator:RequestHandler = (req, res, next) => {
const userSignUpValidator: RequestHandler = (req, res, next) => {
  // name
  req.check("name", "Name is required").notEmpty();
  // email
  req
    .check("email", "Email must be between 3 to 32 character")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    });
  // password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();

  //   if errors show the first one as they happen
  if (errors) {
    const firstError = errors.map((error: any) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

export { userSignUpValidator };
// export default userSignUpValidator;
