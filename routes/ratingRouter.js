import { Router } from "express";
import ratingController from "../controllers/ratingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, ratingController.create);
router.get("/:deviceId", ratingController.getByDevice);

export default router;