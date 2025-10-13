import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["Rating"],
        summary: "Get average rating of a device",
        description: "Returns the average rating and total number of ratings for a device",
        parameters: [
            {
                name: "deviceId",
                in: "path",
                required: true,
                description: "ID of the device",
                schema: { type: "integer", example: 10 },
            },
        ],
        responses: {
            200: {
                description: "Average rating retrieved successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                deviceId: { type: "integer", example: 10 },
                                total: { type: "integer", example: 4 },
                                average: { type: "string", example: "4.25" },
                            },
                        },
                    },
                },
            },
            400: { description: "Invalid deviceId" },
            404: { description: "Device not found or no ratings yet" },
        },
    },
};