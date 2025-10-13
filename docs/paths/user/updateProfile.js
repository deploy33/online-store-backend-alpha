import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    put: {
        tags: ["User"],
        summary: "Update own profile (email, password)",
        security: [{ bearerAuth: [],
    responses: apiResponses
}],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/UserUpdateSelf" },
                    example: {
                        "email": "frodo@shire.me",
                        "password": "NewPass123"
                    }
                },
            },
        },
        responses: {
            200: { description: "Profile updated successfully" },
            400: { description: "Bad request" },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden" },
            404: { description: "Not found" },
        },
    },
};