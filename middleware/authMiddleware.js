import { verifyToken } from "../utils/verifyToken.js";

export default function authMiddleware(req, res, next) {

    try {
        const decoded = verifyToken(req);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
}