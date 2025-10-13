import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    post: {
        tags: ["Device"],
        summary: "Create a new device (ADMIN only)",
        description: "Creates a new device with optional additional info. Requires ADMIN role.",
        security: [{ bearerAuth: [] }],
        requestBody: {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        required: ["name", "price", "brandId", "typeId", "img"],
                        properties: {
                            name: { type: "string", example: "iPhone 15" },
                            price: { type: "number", example: 1200 },
                            brandId: { type: "integer", example: 1 },
                            typeId: { type: "integer", example: 1 },
                            img: { type: "string", format: "binary" },
                            info: { type: "string", example: '[{"title":"Screen","description":"6.1 inch"}]' },
                        },
                    },
                },
            },
        },
        responses: {
            201: {
                ...apiResponses[200],
                description: "Device created successfully",
            },
            400: apiResponses[400],
            401: apiResponses[401],
            403: apiResponses[403],
            500: apiResponses[500],
        },
    },
};