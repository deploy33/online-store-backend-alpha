import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["Device"],
        summary: "Get all devices",
        description: "Fetches all devices with optional filtering by brandId and typeId, pagination supported.",
        parameters: [
            { name: "brandId", in: "query", schema: { type: "integer" }, required: false },
            { name: "typeId", in: "query", schema: { type: "integer" }, required: false },
            { name: "page", in: "query", schema: { type: "integer", default: 1 }, required: false },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 }, required: false },
        ],
        responses: {
            200: {
                ...apiResponses[200],
                description: "Devices fetched successfully",
            },
            500: apiResponses[500],
        },
    },
};