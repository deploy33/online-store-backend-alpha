import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    post: {
        tags: ["Type"],
        summary: "Create a new product type (ADMIN only)",
        description: "Allows an admin to create a new product type",
        security: [{ bearerAuth: [] }],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/TypeCreate" },
                },
            },
        },
        responses: {
            201: {
                description: "Type created successfully",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/TypeBase" },
                    },
                },
            },
            400: { description: "Invalid input" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            ...apiResponses,
        },
    },
};