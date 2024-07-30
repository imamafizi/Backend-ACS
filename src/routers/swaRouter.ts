import express from "express";
import { allSWAController } from "../controllers/SWA/allSWAController";

const router = express.Router();

router.get("/", allSWAController);

export default router;
