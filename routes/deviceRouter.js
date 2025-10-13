import { Router } from "express";
import deviceController from "../controllers/deviceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import { Device } from "../models/models.js";
import ApiError from "../error/ApiError.js";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = new Router();


// PUBLIC ROUTES
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

// USER-FRIENDLY IMAGE URL
router.get("/:id/image", async (req, res, next) => {
    try {
        const device = await Device.findByPk(req.params.id);
        if (!device) return next(ApiError.notFound("Device not found"));

        const imgPath = path.resolve(__dirname, "..", "static", device.img);
        res.sendFile(imgPath);
    } catch (e) {
        next(ApiError.internalServerError(e.message));
    }
});

// ADMIN ONLY
router.post("/", authMiddleware, checkRoleMiddleware("ADMIN"), deviceController.create);
router.put("/:id", authMiddleware, checkRoleMiddleware("ADMIN"), deviceController.update);
router.delete("/:id", authMiddleware, checkRoleMiddleware("ADMIN"), deviceController.delete);

export default router;