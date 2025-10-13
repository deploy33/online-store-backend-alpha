import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    post: {
        tags: ["Cart"],
        summary: "Add device to user's cart",
        description: "Adds a device to the current user's cart. User ID is taken from the JWT token.",
        security: [{ bearerAuth: [] }],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["deviceId", "quantity"],
                        properties: {
                            deviceId: { type: "integer", example: 5 },
                            quantity: { type: "integer", example: 2 },
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                ...apiResponses[200],
                description: "Device added successfully",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ApiResponse" },
                        example: {
                            status: 200,
                            message: "Device added successfully",
                            data: { deviceId: 5, quantity: 2 },
                        },
                    },
                },
            },
            400: apiResponses[400],
            401: apiResponses[401],
            403: apiResponses[403],
            500: apiResponses[500],
        },
    },
};