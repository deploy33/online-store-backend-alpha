import { Router } from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();


// Get current user's cart
router.get("/", authMiddleware, cartController.getCart);

// Add to a cart
router.post("/add", authMiddleware, cartController.addToCart);

// Upd quantity
router.put("/", authMiddleware, cartController.updateCart);

// Remove from cart by deviceId
router.delete("/:deviceId", authMiddleware, cartController.removeFromCart);

// Clear cart
router.delete("/clear", authMiddleware, cartController.clearCart);

export default router;