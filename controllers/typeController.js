import { Type } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { validationResult } from "express-validator";

class TypeController {
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
      const type = await Type.create({ name });
      res.status(201).json({ id: type.id, name: type.name });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await Type.findAll({ attributes: ["id", "name"] });
      return res.json(types);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(+id, { attributes: ["id", "name"] });

      if (!type) return next(ApiError.notFound("Type not found"));
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
            ApiError.badRequest(
                "Validation failed: " + errors.array().map(e => e.msg).join(", ")
            )
        );
      }

      const { id } = req.params;
      const { name } = req.body;
      const type = await Type.findByPk(+id);
      if (!type) return next(ApiError.notFound("Type not found"));

      await type.update({ name });
      return res.json({ id: type.id, name: type.name });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(+id);
      if (!type) return next(ApiError.notFound("Type not found"));

      await Type.destroy({ where: { id } });
      return res.json({ message: "Type deleted successfully" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new TypeController();