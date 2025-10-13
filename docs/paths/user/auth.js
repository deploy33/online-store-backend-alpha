import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["User"],
        summary: "Check user authentication and token validity",
        security: [{ bearerAuth: [],
    responses: apiResponses
}],
        responses: {
            200: {
                description: "Token is valid. Returns user data or new token",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                email: { type: "string" },
                                role: { type: "string" },
                                token: { type: "string" },
                            },
                        },
                    },
                },
            },
            401: { description: "Invalid or expired token" },
        },
    },
};