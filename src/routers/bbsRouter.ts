import express from "express";
import { getBBSAtRiskAndSafeController } from "../controllers/BBS/getBBSAtRiskAndSafeController";
import { getBBSAtRiskCategoriesController } from "../controllers/BBS/getBBSAtRiskCategoriesController";
import { getBBSByIdController } from "../controllers/BBS/getBBSByIdController";
import { getBBSController } from "../controllers/BBS/getBBSController";
import { getTop5SafeCategoriesController } from "../controllers/BBS/getTop5SafeRecordsController";
import { postBBSController } from "../controllers/BBS/postBBSController";
import { verifyToken } from "../middleware/jwtVerifyToken";

const router = express.Router();

router.get("/", verifyToken, getBBSController);
router.get(
  "/at-risk-categories",
  verifyToken,
  getBBSAtRiskCategoriesController
);
router.get("/at-risk-and-safe", verifyToken, getBBSAtRiskAndSafeController);
router.get("/top-5", verifyToken, getTop5SafeCategoriesController);
router.post("/:id", verifyToken, postBBSController);
router.get("/:id", verifyToken, getBBSByIdController);

export default router;
