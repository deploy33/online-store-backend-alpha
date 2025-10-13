import { Brand } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { validationResult } from "express-validator";

class BrandController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
            ApiError.badRequest(
                "Validation failed: " + errors.array().map(e => e.msg).join(", ")
            )
        );
      }

      const { name } = req.body;
      const brand = await Brand.create({ name });
      res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll({ attributes: ["id", "name"] });
      return res.json(brands);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await Brand.findByPk(id, { attributes: ["id", "name"] });

      if (!brand) {
        return next(ApiError.notFound("Brand not found"));
      }

      return res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const brand = await Brand.findByPk(id);
      if (!brand) {
        return next(ApiError.notFound("Brand not found"));
      }

      await brand.update({ name });
      return res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await Brand.findByPk(id);

      if (!brand) {
        return next(ApiError.notFound("Brand not found"));
      }

      await Brand.destroy({ where: { id } });
      return res.json({ message: "Brand deleted successfully" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new BrandController();