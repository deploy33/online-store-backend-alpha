import { validationResult } from "express-validator";

/**
 * миддлуэйр для обработки ошибок
 * используется после body(), param(), query() проверок
 * если найдены ошибки, то возвращает 400 и список ошибок
 */
export function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
                value: err.value,
            })),
        });
    }

    next();
}