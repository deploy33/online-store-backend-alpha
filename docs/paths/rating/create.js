import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    post: {
        tags: ["Rating"],
        summary: "Add or update rating for a device",
        description: "Authorized users can rate a device. One user can rate a device only once.",
        security: [{ bearerAuth: [] }],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["rate", "deviceId"],
                        properties: {
                            rate: { type: "integer", example: 4, description: "Rating between 1 and 5" },
                            deviceId: { type: "integer", example: 10, description: "ID of the device" },
                        },
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Rating created or updated successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string", example: "Rating created" },
                                rating: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer", example: 1 },
                                        rate: { type: "integer", example: 4 },
                                        deviceId: { type: "integer", example: 10 },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            400: { description: "Invalid input or deviceId" },
            401: { description: "Unauthorized" },
            404: { description: "Device not found" },
        },
    },
};