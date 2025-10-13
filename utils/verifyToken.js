import jwt from "jsonwebtoken";

export function verifyToken(req) {
    console.log("🔐 Incoming Authorization header:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Error("User unauthorized");
    }

    const token = authHeader.split(" ")[1]; // тип — Bearer
    if (!token) {
        throw new Error("User unauthorized");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch {
        throw new Error("User unauthorized");
    }
}