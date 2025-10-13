import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import { checkPasswordAndEmailValidityMiddleware } from "../middleware/checkPasswordAndEmailValidityMiddleware.js";
import { checkUserUpdateValidityMiddleware } from "../middleware/checkUserUpdateValidityMiddleware.js";
import rejectUnknownFields from "../middleware/rejectUnknownFields.js";

const router = new Router();

router.post("/registration", checkPasswordAndEmailValidityMiddleware, userController.registration);
router.get("/auth", authMiddleware, userController.check);
router.post("/login", userController.login);
router.get("/", authMiddleware, checkRoleMiddleware("ADMIN"), userController.getAll);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/profile", authMiddleware, rejectUnknownFields(["email", "password"]), checkUserUpdateValidityMiddleware, userController.updateProfile);
router.put("/:id", authMiddleware, rejectUnknownFields(["email", "password", "role"]), checkRoleMiddleware("ADMIN"), checkUserUpdateValidityMiddleware, userController.update);
router.delete("/:id", authMiddleware, checkRoleMiddleware("ADMIN"), userController.delete);

export default router;
