import express from "express";
import { allSWAController } from "../controllers/SWA/allSWAController";
import { postImplementorController } from "../controllers/SWA/postImplementorController";
import { perpetratorController } from "../controllers/SWA/perpetratorController";
import { getSWAByIdController } from "../controllers/SWA/getSWAByIdController";
import { postSWAController } from "../controllers/SWA/postSWAController";

const router = express.Router();

router.get("/", allSWAController);
router.get("/:id", getSWAByIdController);
router.post("/:id", postSWAController);
router.post("/implementor", postImplementorController);
router.post("/prepetrator", perpetratorController);

export default router;
