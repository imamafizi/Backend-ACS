import express from "express";
import { bbsController } from "../controllers/BBS/bbsController";

const router = express.Router();

router.get("/", bbsController);

export default router;
