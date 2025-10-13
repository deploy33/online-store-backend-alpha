import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["User"],
        summary: "Get user by ID (ADMIN only)",
        security: [{ bearerAuth: [],
    responses: apiResponses
}],
        description: "Admin can access any user, regular users can access only themselves",
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer", example: 1 },
            },
        ],
        responses: {
            200: {
                description: "User found",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UserResponse" },
                    },
                },
            },
            404: { description: "User not found" },
        },
    },
};