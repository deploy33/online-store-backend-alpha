import { Router } from "express";
const router = new Router();
import deviceRouter from "./deviceRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";
import userRouter from "./userRouter.js";
import cartRouter from "./cartRouter.js";
import ratingRouter from "./ratingRouter.js";

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

router.use("/cart", cartRouter);
router.use("/rating", ratingRouter);

export default router;
