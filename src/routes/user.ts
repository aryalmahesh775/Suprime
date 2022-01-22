import express from "express";
const router = express.Router();
// import userSignUpValidator from "../Validator/index";
import { userSignUpValidator } from "../Validator/index";
import { auth } from "../middleware/auth";
import { signUp, signIn, signout, getUsers } from "../controllers/user";

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);
// router.get("/all", auth, getUsers);
router.get("/all", getUsers);
router.get("/signout", signout);

export default router;
