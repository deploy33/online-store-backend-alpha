import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    post: {
        tags: ["Brand"],
        summary: "Create a new brand (ADMIN only)",
        security: [{ bearerAuth: [] }],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["name"],
                        properties: {
                            name: { type: "string", example: "Apple" },
                        },
                    },
                },
            },
        },
        responses: {
            200: { ...apiResponses[200], description: "Brand created successfully" },
            400: apiResponses[400],
            401: apiResponses[401],
            403: apiResponses[403],
            500: apiResponses[500],
        },
    },
};