export const apiResponses = {
    200: {
        description: "Request completed successfully",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
                example: {
                    status: 200,
                    message: "Request completed successfully",
                    data: {},
                },
            },
        },
    },
    400: {
        description: "Bad request",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
                example: { status: 400, message: "Invalid request data" },
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
    403: {
        description: "Forbidden",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
                example: { status: 403, message: "Access denied" },
            },
        },
    },
    500: {
        description: "Internal server error",
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
                example: { status: 500, message: "Internal server error" },
            },
        },
    },
};