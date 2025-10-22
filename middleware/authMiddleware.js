import { verifyToken } from "../utils/verifyToken.js";

export default function authMiddleware(req, res, next) {

    try {
        const decoded = verifyToken(req);
        req.user = decoded;
        next();
    } catch (e) {
        return next(ApiError.unauthorized(e.message || "Invalid or expired token"));
    }
}