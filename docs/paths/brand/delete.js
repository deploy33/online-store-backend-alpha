import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    delete: {
        tags: ["Brand"],
        summary: "Delete brand by ID (ADMIN only)",
        description: "Allows an admin to delete a specific brand by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer", example: 1 },
                description: "ID of the brand to delete",
            },
        ],
        responses: {
            200: { description: "Brand deleted successfully" },
            404: { description: "Brand not found" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin access required" },
            ...apiResponses,
        },
    },
};