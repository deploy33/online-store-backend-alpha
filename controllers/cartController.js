import { Cart, CartDevice, Device } from "../models/models.js";
import { sendResponse } from "../utils/sendResponse.js";

class CartController {

    // Получить корзину пользователя
    async getCart(req, res, next) {
        try {
            const userId = req.user.id;

            let cart = await Cart.findOne({
                where: { userId },
                include: [{ model: CartDevice, include: [Device] }],
            });

            if (!cart) {
                cart = await Cart.create({ userId });
                return sendResponse(res, 200, "Empty cart created", {
                    ...cart.toJSON(),
                    devices: [],
                });
            }

            return sendResponse(res, 200, "Cart fetched successfully", cart);
        } catch (e) {
            console.error("getCart error:", e);
            return sendResponse(res, 500, "Failed to fetch cart");
        }
    }

    // Добавить устройство в корзину
    async addToCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { deviceId, quantity } = req.body;

            if (!deviceId) return sendResponse(res, 400, "Missing required field: deviceId");

            const device = await Device.findByPk(deviceId);
            if (!device) return sendResponse(res, 404, "Device not found");

            let cart = await Cart.findOne({ where: { userId } });
            if (!cart) cart = await Cart.create({ userId });

            let cartDevice = await CartDevice.findOne({
                where: { cartId: cart.id, deviceId },
            });

            if (cartDevice) {
                cartDevice.quantity += quantity !== undefined ? quantity : 1;
                await cartDevice.save();
            } else {
                cartDevice = await CartDevice.create({
                    cartId: cart.id,
                    deviceId,
                    quantity: quantity !== undefined ? quantity : 1,
                });
            }

            return sendResponse(res, 200, "Device added successfully", cartDevice);
        } catch (e) {
            console.error("addToCart error:", e);
            return sendResponse(res, 500, "Failed to add device to cart");
        }
    }

    // Удалить устройство из корзины
    async removeFromCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { deviceId } = req.params;

            if (!deviceId) return sendResponse(res, 400, "Missing required field: deviceId");

            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) return sendResponse(res, 404, "Cart not found");

            const deleted = await CartDevice.destroy({
                where: { cartId: cart.id, deviceId },
            });

            if (!deleted) return sendResponse(res, 404, "Device not found in cart");

            const updatedCart = await Cart.findOne({
                where: { userId },
                include: [{ model: CartDevice, include: [Device] }],
            });

            return sendResponse(res, 200, "Device removed successfully", updatedCart);
        } catch (e) {
            console.error("removeFromCart error:", e);
            return sendResponse(res, 500, "Failed to remove device from cart");
        }
    }

    // Обновить количество устройства
    async updateCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { deviceId, quantity } = req.body;

            if (!deviceId || typeof quantity !== "number" || quantity < 1) {
                return sendResponse(res, 400, "Missing or invalid fields. Quantity must be >= 1");
            }

            const device = await Device.findByPk(deviceId);
            if (!device) return sendResponse(res, 404, "Device not found");

            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) return sendResponse(res, 404, "Cart not found");

            const cartDevice = await CartDevice.findOne({
                where: { cartId: cart.id, deviceId },
            });

            if (!cartDevice) return sendResponse(res, 404, "Device not found in cart");

            cartDevice.quantity = quantity;
            await cartDevice.save();

            return sendResponse(res, 200, "Quantity updated successfully", cartDevice);
        } catch (e) {
            console.error("updateCart error:", e);
            return sendResponse(res, 500, "Internal server error");
        }
    }

    // Очистить корзину
    async clearCart(req, res, next) {
        try {
            const userId = req.user.id;

            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) return sendResponse(res, 404, "Cart not found");

            await CartDevice.destroy({ where: { cartId: cart.id } });

            return sendResponse(res, 200, "Cart cleared successfully");
        } catch (e) {
            console.error("clearCart error:", e);
            return sendResponse(res, 500, "Failed to clear cart");
        }
    }
}

export default new CartController();