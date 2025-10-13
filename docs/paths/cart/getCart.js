import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["Cart"],
        summary: "Get current user's cart",
        description: "Returns the current user's cart. User ID is taken from the JWT token.",
        security: [{ bearerAuth: [] }],
        responses: {
            200: {
                ...apiResponses[200],
                description: "Cart fetched successfully",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ApiResponse" },
                        example: {
                            status: 200,
                            message: "Cart fetched successfully",
                            data: {
                                id: 1,
                                userId: 6,
                                CartDevices: [
                                    { deviceId: 5, quantity: 2, Device: { name: "Lightsaber" } },
                                ],
                            },
                        },
                    },
                },
            },
            401: apiResponses[401],
            500: apiResponses[500],
        },
    },
};