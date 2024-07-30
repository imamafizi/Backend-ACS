import express from "express";
import { registerController } from "../controllers/users/registerController";
import { loginController } from "../controllers/users/loginController";
import { cekUsersController } from "../controllers/users/cekusercontroller";

const router = express.Router();

router.post("/", registerController);
router.post("/login", loginController);
router.get("/", cekUsersController);

export default router;
