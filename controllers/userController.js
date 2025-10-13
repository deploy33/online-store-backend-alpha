import ApiError from "../error/ApiError.js";
import { User, Cart } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse.js";

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

class userController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest("Email and password are required"));
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return next(ApiError.badRequest("User with this email already exists"));
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword, role: "USER" });
      await Cart.create({ userId: user.id });

      const token = generateToken(user.id, user.email, user.role);

      return sendResponse(res, 201, "User registered successfully", {
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
    } catch (e) {
      next(ApiError.internalServerError("Registration failed"));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) return next(ApiError.badRequest("Invalid email or password"));

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return next(ApiError.badRequest("Invalid email or password"));

      const token = generateToken(user.id, user.email, user.role);

      return sendResponse(res, 200, "Login successful", {
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
    } catch (e) {
      next(ApiError.internalServerError("Login failed"));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateToken(req.user.id, req.user.email, req.user.role);
      return sendResponse(res, 200, "Token refreshed successfully", {
        user: { id: req.user.id, email: req.user.email, role: req.user.role },
        token,
      });
    } catch (e) {
      next(ApiError.internalServerError("Token verification failed"));
    }
  }

  async getAll(req, res, next) {
    try {

      if (!req.user) {
        return sendResponse(res, 401, "User unauthorized");
      }


      if (req.user.role !== "ADMIN") {
        return sendResponse(res, 403, "Access denied: admin only");
      }


      const users = await User.findAll({
        attributes: ["id", "email", "role", "createdAt"],
      });

      return sendResponse(res, 200, "User list fetched successfully", { users });
    } catch (e) {
      console.error("getAll users error:", e);
      return sendResponse(res, 500, "Failed to fetch users");
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      if (req.user.role !== "ADMIN" && req.user.id !== Number(id)) {
        return next(ApiError.forbidden("Access denied"));
      }

      const user = await User.findByPk(id, {
        attributes: ["id", "email", "role"],
      });

      if (!user) return next(ApiError.notFound("User not found"));

      return sendResponse(res, 200, "User found", { user });
    } catch (e) {
      next(ApiError.internalServerError("Failed to fetch user"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, role, password } = req.body;


      if (req.user.role !== "ADMIN" && req.user.id !== Number(id)) {
        return next(ApiError.forbidden("You can only update your own profile"));
      }

      const user = await User.findByPk(id);
      if (!user) return next(ApiError.notFound("User not found"));

      const updateData = {};
      if (email) updateData.email = email;

      // only ADMIN can change a user's role
      if (typeof role !== "undefined") {  //проверка на наличие поля role в теле запроса
        if (req.user.role !== "ADMIN") {
          return next(ApiError.forbidden("Only admin can change roles"));
        }
        updateData.role = role;
      }

      if (password) updateData.password = await bcrypt.hash(password, 10);

      await user.update(updateData, { fields: Object.keys(updateData) });

      const safeUser = user.get({ plain: true });
      delete safeUser.password;

      return sendResponse(res, 200, "User updated successfully", { user: safeUser });
    } catch (e) {
      next(ApiError.internalServerError("Failed to update user"));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const requester = req.user;


      if (requester.role !== "ADMIN") { // only admin can delete a user
        return next(ApiError.forbidden("Only admin can delete users"));
      }

      const user = await User.findByPk(id);
      if (!user) {
        return next(ApiError.notFound("User not found"));
      }

      await user.destroy();
      return sendResponse(res, 200, "User deleted successfully");
    } catch (e) {
      next(ApiError.internalServerError("Failed to delete user"));
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const { email, password } = req.body; // только разрешенные поля (email, password)

      const user = await User.findByPk(userId);
      if (!user) return next(ApiError.notFound("User not found"));

      const updates = {};
      if (email) updates.email = email;
      if (password) updates.password = await bcrypt.hash(password, 10);

      if (Object.keys(updates).length === 0) {
        return next(ApiError.badRequest("No fields to update"));
      }

      await user.update(updates, { fields: Object.keys(updates) });

      const safeUser = user.get({ plain: true });
      delete safeUser.password;

      return sendResponse(res, 200, "Profile updated successfully", { user: safeUser });
    } catch (e) {
      next(ApiError.internalServerError("Failed to update profile"));
    }
  }
}

export default new userController();