import ApiError from "../error/ApiError.js";
import { emailRule, passwordRule } from "./validators/userValidationRules.js";
import { handleValidationErrors } from "../middleware/helpers/handleValidationErrors.js";
import { body } from "express-validator";

export const checkUserUpdateValidityMiddleware = [
    emailRule.optional(),
    passwordRule.optional(),

    (req, res, next) => {
        const isAdmin = req.user?.role === "ADMIN";

        if (isAdmin) {
            body("role")
                .optional()
                .isIn(["USER", "ADMIN"])
                .withMessage("Role must be either USER or ADMIN")(req, res, () => {});
        } else if (req.body.role) {
            return next(ApiError.forbidden("Only admin can update role"));
        }
        next();
    },
    handleValidationErrors,
];