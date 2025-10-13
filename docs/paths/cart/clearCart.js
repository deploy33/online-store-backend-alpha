import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    delete: {
        tags: ["Cart"],
        summary: "Clear current user's cart",
        description: "Removes all devices from the current user's cart. User ID is taken from the JWT token.",
        security: [{ bearerAuth: [] }],
        responses: {
            200: {
                ...apiResponses[200],
                description: "Cart cleared successfully",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ApiResponse" },
                        example: { status: 200, message: "Cart cleared successfully", data: null },
                    },
                },
            },
            401: apiResponses[401],
            500: apiResponses[500],
        },
    },
};