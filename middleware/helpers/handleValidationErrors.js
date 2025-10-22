import { validationResult } from "express-validator";
import ApiError from "../../error/ApiError.js";

export function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formatted = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
            value: err.value,
        }));

        return next(ApiError.badRequest(JSON.stringify({
            message: "Validation error",
            errors: formatted,
        })));
    }

    next();
}