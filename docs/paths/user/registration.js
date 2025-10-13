import { apiResponses } from "../../utils/responseTemplates.js";

export default {
    post: {
        tags: ["User"],
        summary: "User registration",
        description: "Registers a new user and returns user data with token",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/UserRegister",
    responses: apiResponses
},
                },
            },
        },
        responses: {
            200: {
                description: "User registered successfully",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ApiResponse" },
                    },
                },
            },
            400: {
                description: "Validation error",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ApiResponse" },
                        example: { status: 400, message: "Invalid email format" },
                    },
                },
            },
            401: {
                description: "Unauthorized",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ApiResponse" },
                        example: { status: 401, message: "User unauthorized" },
                    },
                },
            },
        },
    },
};