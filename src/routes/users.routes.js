import { Router } from "express";
import {
  renderSignUpForm,
  signUp,
  renderSigninForm,
  signin,
  logout,
} from "../controllers/users.controller.js";
import { verifySignup } from "../middlewares";

const router = Router();

// Routes
router.get("/signup", renderSignUpForm);

router.post(
  "/signup",
  [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  signUp
);

router.get("/login", renderSigninForm);

router.post("/login", signin);

router.get("/logout", logout);

export default router;
