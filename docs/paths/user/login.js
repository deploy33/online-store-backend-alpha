import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    post: {
        tags: ["User"],
        summary: "User login",
        description: "Authenticates a user and returns a JWT token",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/UserLogin",
    responses: apiResponses
},
                },
            },
        },
        responses: {
            200: {
                description: "Login successful",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/UserLogin" },
                    },
                },
            },
            400: { description: "Bad request" },
            401: { description: "Unauthorized" },
            500: { description: "Internal server error" },
        },
    },
};