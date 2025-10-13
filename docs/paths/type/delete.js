import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    delete: {
        tags: ["Type"],
        summary: "Delete a product type (ADMIN only)",
        description: "Allows an admin to delete a product type by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "ID of the type to delete",
                schema: { type: "integer", example: 1 },
            },
        ],
        responses: {
            200: { description: "Type deleted successfully" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            404: { description: "Type not found" },
            ...apiResponses,
        },
    },
};