import { Rating, Device } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class RatingController {
    // POST /api/rating
    async create(req, res, next) {
        try {
            const userId = req.user.id; // JWT
            const { rate, deviceId } = req.body;

            if (!rate || !deviceId) {
                return next(ApiError.badRequest("Rate and deviceId are required"));
            }

            const deviceIdNum = +deviceId;
            if (isNaN(deviceIdNum)) {
                return next(ApiError.badRequest("Invalid deviceId"));
            }

            if (rate < 1 || rate > 5) {
                return next(ApiError.badRequest("Rate must be between 1 and 5"));
            }

            const device = await Device.findByPk(deviceIdNum);
            if (!device) {
                return next(ApiError.notFound("Device not found"));
            }

            // single rate per device by a user
            let rating = await Rating.findOne({ where: { userId, deviceId: deviceIdNum } });
            if (rating) {
                rating.rate = rate;
                await rating.save();
                const ratingData = rating.get({ plain: true });
                delete ratingData.userId; // exclude userId
                return res.json({ message: "Rating updated", rating: ratingData });
            }

            rating = await Rating.create({ rate, userId, deviceId: deviceIdNum });
            const ratingData = rating.get({ plain: true });
            delete ratingData.userId;
            return res.status(201).json({ message: "Rating created", rating: ratingData });

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // GET /api/rating/:deviceId
    async getByDevice(req, res, next) {
        try {
            const deviceIdNum = +req.params.deviceId;
            if (isNaN(deviceIdNum)) {
                return next(ApiError.badRequest("Invalid deviceId"));
            }

            const ratings = await Rating.findAll({
                where: { deviceId: deviceIdNum },
                attributes: ["rate"], // to exclude userId
            });

            const total = ratings.length;
            const average = total
                ? (ratings.reduce((sum, r) => sum + r.rate, 0) / total).toFixed(2)
                : null;

            res.json({ deviceId: deviceIdNum, total, average });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

export default new RatingController();