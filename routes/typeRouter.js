import { Router } from "express";
import typeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import { body, param } from "express-validator";

const router = new Router();

router.post(
    "/",
    checkRoleMiddleware("ADMIN"),
    body("name")
        .notEmpty()
        .withMessage("Type name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Type name must be between 2 and 50 characters"),
    typeController.create
);

router.get("/", typeController.getAll);

router.get(
    "/:id",
    param("id").isInt().withMessage("ID must be an integer"),
    typeController.getById
);

router.put(
    "/:id",
    checkRoleMiddleware("ADMIN"),
    param("id").isInt().withMessage("ID must be an integer"),
    body("name")
        .notEmpty()
        .withMessage("Type name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Type name must be between 2 and 50 characters"),
    typeController.update
);

router.delete(
    "/:id",
    checkRoleMiddleware("ADMIN"),
    param("id").isInt().withMessage("ID must be an integer"),
    typeController.delete
);

export default router;