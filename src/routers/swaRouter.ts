import express from "express";
import { getSWAByIdController } from "../controllers/SWA/getSWAByIdController";
import { getSWAController } from "../controllers/SWA/getSWAController";
import { postSWAController } from "../controllers/SWA/postSWAController";
import { verifyToken } from "../middleware/jwtVerifyToken";

const router = express.Router();

router.get("/", verifyToken, getSWAController);
router.get("/:id", verifyToken, getSWAByIdController);
router.post("/:id", verifyToken, postSWAController);

export default router;
