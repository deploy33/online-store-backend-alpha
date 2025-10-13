import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["Device"],
        summary: "Get device by ID",
        description: "Fetches a single device by its ID, including additional info if present.",
        parameters: [
            { name: "id", in: "path", schema: { type: "integer" }, required: true, description: "ID of the device" },
        ],
        responses: {
            200: {
                ...apiResponses[200],
                description: "Device fetched successfully",
            },
            404: apiResponses[404],
            500: apiResponses[500],
        },
    },
};