import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Device, DeviceInfo, Type, Brand } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class DeviceController {
  // Create a device (ADMIN only)
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;

      if (!name || !price || !brandId || !typeId) {
        return next(ApiError.badRequest("Name, price, brandId, and typeId are required"));
      }

      if (Number(price) <= 0) return next(ApiError.badRequest("Price must be positive"));

      const brand = await Brand.findByPk(brandId);
      if (!brand) return next(ApiError.badRequest("Brand not found"));

      const type = await Type.findByPk(typeId);
      if (!type) return next(ApiError.badRequest("Type not found"));

      if (!req.files || !req.files.img) {
        return next(ApiError.badRequest("Image file is required"));
      }

      const { img } = req.files;

      // Check file type and size
      if (!["image/png", "image/jpeg", "image/jpg"].includes(img.mimetype)) {
        return next(ApiError.badRequest("Invalid image type"));
      }
      if (img.size > 5_000_000) {
        return next(ApiError.badRequest("Image size must be <= 5MB"));
      }

      const fileName = uuidv4() + path.extname(img.name);
      await img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({ name, price, brandId, typeId, img: fileName });

      // Parse info
      if (info) {
        let parsedInfo;
        try {
          parsedInfo = typeof info === "string" ? JSON.parse(info) : info;
          if (!Array.isArray(parsedInfo)) throw new Error();
        } catch {
          return next(ApiError.badRequest("Info field must be a valid JSON array"));
        }

        parsedInfo.forEach(el => {
          if (!el.title || !el.description) {
            throw new Error("Each info item must have title and description");
          }
        });

        await Promise.all(
            parsedInfo.map(el =>
                DeviceInfo.create({ title: el.title, description: el.description, deviceId: device.id })
            )
        );
      }

      return sendResponse(res, 201, "Device created successfully", { device });
    } catch (e) {
      next(ApiError.internalServerError(e.message));
    }
  }

  // Get all devices (public)
  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      const offset = (page - 1) * limit;

      const where = {};
      if (brandId) where.brandId = Number(brandId);
      if (typeId) where.typeId = Number(typeId);

      const devices = await Device.findAndCountAll({ where, limit, offset });
      return sendResponse(res, 200, "Devices fetched successfully", { devices });
    } catch (e) {
      next(ApiError.internalServerError(e.message));
    }
  }

  // Get single device by ID (public)
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(id)) return next(ApiError.badRequest("Invalid device ID"));

      const device = await Device.findByPk(id, { include: [{ model: DeviceInfo, as: "info" }] });
      if (!device) return next(ApiError.notFound("Device not found"));

      return sendResponse(res, 200, "Device fetched successfully", { device });
    } catch (e) {
      next(ApiError.internalServerError(e.message));
    }
  }

  // Update device (ADMIN only)
  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(id)) return next(ApiError.badRequest("Invalid device ID"));

      const { name, price, brandId, typeId, info } = req.body;

      const device = await Device.findByPk(id);
      if (!device) return next(ApiError.notFound("Device not found"));

      const updateData = {};
      if (name) updateData.name = name;
      if (price) {
        if (Number(price) <= 0) return next(ApiError.badRequest("Price must be positive"));
        updateData.price = price;
      }

      if (brandId) {
        const brand = await Brand.findByPk(brandId);
        if (!brand) return next(ApiError.badRequest("Brand not found"));
        updateData.brandId = brandId;
      }

      if (typeId) {
        const type = await Type.findByPk(typeId);
        if (!type) return next(ApiError.badRequest("Type not found"));
        updateData.typeId = typeId;
      }

      if (req.files && req.files.img) {
        const { img } = req.files;
        if (!["image/png", "image/jpeg", "image/jpg"].includes(img.mimetype)) {
          return next(ApiError.badRequest("Invalid image type"));
        }
        if (img.size > 5_000_000) {
          return next(ApiError.badRequest("Image size must be <= 5MB"));
        }
        const fileName = uuidv4() + path.extname(img.name);
        await img.mv(path.resolve(__dirname, "..", "static", fileName));
        updateData.img = fileName;
      }

      await device.update(updateData, { fields: Object.keys(updateData) });

      // Update device info
      if (info) {
        let parsedInfo;
        try {
          parsedInfo = typeof info === "string" ? JSON.parse(info) : info;
          if (!Array.isArray(parsedInfo)) throw new Error();
        } catch {
          return next(ApiError.badRequest("Info must be a valid JSON array"));
        }

        parsedInfo.forEach(el => {
          if (!el.title || !el.description) {
            throw new Error("Each info item must have title and description");
          }
        });

        await DeviceInfo.destroy({ where: { deviceId: device.id } });
        await Promise.all(
            parsedInfo.map(el =>
                DeviceInfo.create({ title: el.title, description: el.description, deviceId: device.id })
            )
        );
      }

      return sendResponse(res, 200, "Device updated successfully", { device });
    } catch (e) {
      next(ApiError.internalServerError(e.message));
    }
  }

  // Delete device (ADMIN only)
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(id)) return next(ApiError.badRequest("Invalid device ID"));

      const device = await Device.findByPk(id);
      if (!device) return next(ApiError.notFound("Device not found"));

      // Remove associated info
      await DeviceInfo.destroy({ where: { deviceId: device.id } });
      await Device.destroy({ where: { id } });

      return sendResponse(res, 200, "Device deleted successfully");
    } catch (e) {
      next(ApiError.internalServerError(e.message));
    }
  }
}

export default new DeviceController();