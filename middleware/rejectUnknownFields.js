import ApiError from "../error/ApiError.js";

/**
 * Данный mw проверяет req.body на предмет наличия неизвестных полей.
 */
export default function rejectUnknownFields(allowedFields = []) {
    return (req, res, next) => {
        if (!req.body || typeof req.body !== "object") {
            return next(ApiError.badRequest("Invalid request body"));
        }

        const bodyKeys = Object.keys(req.body);
        const unknownFields = bodyKeys.filter((key) => !allowedFields.includes(key));

        if (unknownFields.length > 0) {
            return next(
                ApiError.badRequest(
                    `Unknown fields: ${unknownFields.join(", ")}`
                )
            );
        }

        next();
    };
}