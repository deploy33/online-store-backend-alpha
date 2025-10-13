import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    delete: {
        tags: ["Device"],
        summary: "Delete device (ADMIN only)",
        description: "Deletes a device by ID. Requires ADMIN role.",
        security: [{ bearerAuth: [] }],
        parameters: [
            { name: "id", in: "path", schema: { type: "integer" }, required: true, description: "ID of the device to delete" },
        ],
        responses: {
            200: {
                ...apiResponses[200],
                description: "Device deleted successfully",
            },
            401: apiResponses[401],
            403: apiResponses[403],
            404: apiResponses[404],
            500: apiResponses[500],
        },
    },
};