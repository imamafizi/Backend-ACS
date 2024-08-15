import express from "express";
import { bbsController } from "../controllers/BBS/bbsController";
import { getBBSByIdController } from "../controllers/BBS/getBBSByIdController";
import { postBBSController } from "../controllers/BBS/postBBSController";

const router = express.Router();

router.get("/", bbsController);
router.post("/:id", postBBSController);
router.get("/:id", getBBSByIdController);

export default router;
