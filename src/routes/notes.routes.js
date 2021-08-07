import { Router } from "express";
const router = Router();

import * as userCtrl from "../controllers/notes.controller";
import { authJwt } from "../middlewares";

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.getUsers
);

router.get(
  "/dashboard", 
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.getUserById
);

export default router;