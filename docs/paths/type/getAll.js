import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["Type"],
        summary: "Get all product types",
        description: "Public endpoint that returns all available product types",
        responses: {
            200: {
                description: "List of types retrieved successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: { $ref: "#/components/schemas/TypeBase" },
                        },
                    },
                },
            },
            400: { description: "Bad request" },
            ...apiResponses,
        },
    },
};