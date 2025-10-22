import ApiError from "../error/ApiError.js";
import { verifyToken } from "../utils/verifyToken.js";

export default function checkRoleMiddleware(role) {
    return function (req, res, next) {
        try {
            const decoded = verifyToken(req);

            if (!decoded) {
                return next(ApiError.forbidden("User not authorized"));
            }

            if (decoded.role !== role) {
                return next(ApiError.forbidden("Not enough rights"));
            }

            req.user = decoded;
            next();
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    };
}