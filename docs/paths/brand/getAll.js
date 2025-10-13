import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    get: {
        tags: ["Brand"],
        summary: "Get all brands",
        description: "Returns a list of all brands (public)",
        responses: {
            200: { ...apiResponses[200], description: "List of all brands" },
            500: apiResponses[500],
        },
    },
};