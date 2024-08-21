import express from "express";
import { allSWAController } from "../controllers/SWA/allSWAController";
import { getSWAByIdController } from "../controllers/SWA/getSWAByIdController";
import { postSWAController } from "../controllers/SWA/postSWAController";

const router = express.Router();

router.get("/", allSWAController);
router.get("/:id", getSWAByIdController);
router.post("/:id", postSWAController);

export default router;
