export default {
    type: "object",
    properties: {
        status: {
            type: "integer",
            example: 200,
            description: "HTTP status code",
        },
        message: {
            type: "string",
            example: "Request completed successfully",
        },
        data: {
            type: "object",
            nullable: true,
            description: "Optional payload with data",
            example: {
                user: {
                    id: 1,
                    email: "gandalf@middle-earth.lotr",
                    role: "USER",
                },
                token: "eyJhbGciOiJIUzI1NiIs...",
            },
        },
    },
};