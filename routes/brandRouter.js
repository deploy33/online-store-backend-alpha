import { Router } from "express";
import brandController from "../controllers/brandController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import { body } from "express-validator";

const router = new Router();

router.post(
    "/",
    checkRoleMiddleware("ADMIN"),
    body("name")
        .notEmpty().withMessage("Brand name is required")
        .isLength({ min: 2, max: 50 }).withMessage("Brand name must be between 2 and 50 characters"),
    brandController.create
);

router.get("/", brandController.getAll);
router.get("/:id", brandController.getById);

router.put(
    "/:id",
    checkRoleMiddleware("ADMIN"),
    body("name")
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage("Brand name must be between 2 and 50 characters"),
    brandController.update
);
router.delete("/:id", checkRoleMiddleware("ADMIN"), brandController.delete);

export default router;