import { verifyToken } from "../utils/verifyToken.js";

export default function checkRoleMiddleware(role) {
    return function (req, res, next) {

        try {
            const decoded = verifyToken(req);

            if (decoded.role !== role) {
                return res.status(403).json({ message: "Not enough rights" });
            }

            req.user = decoded;
            next();
        } catch (e) {
            return res.status(401).json({ message: e.message });
        }
    };
}