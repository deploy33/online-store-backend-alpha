import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    delete: {
        tags: ["Cart"],
        summary: "Remove device from current user's cart",
        description: "Removes a device from the current user's cart. User ID is taken from the JWT token.",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                name: "deviceId",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "ID of the device to remove",
            },
        ],
        responses: {
            200: {
                ...apiResponses[200],
                description: "Device removed successfully",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ApiResponse" },
                        example: {
                            status: 200,
                            message: "Device removed successfully",
                            data: {
                                id: 1,
                                userId: 6,
                                CartDevices: [],
                            },
                        },
                    },
                },
            },
            400: apiResponses[400],
            401: apiResponses[401],
            404: apiResponses[404],
            500: apiResponses[500],
        },
    },
};