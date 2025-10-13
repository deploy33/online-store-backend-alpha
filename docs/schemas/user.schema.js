const userBaseSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            example: 1,
            description: "ID",
        },
        email: {
            type: "string",
            format: "email",
            example: "gandalf@shire.lr",
            description: "User's email",
        },
        password: {
            type: "string",
            example: "Password123",
            description: "Hashed password",
        },
        role: {
            type: "string",
            enum: ["USER", "ADMIN"],
            default: "USER",
            example: "USER",
            description: "User role",
        },
    },
    additionalProperties: false,
};

// POST /api/user/registration

const userResponseSchema = {
    type: "object",
    properties: {
        id: { type: "integer", example: 2 },
        email: { type: "string", format: "email", example: "youremail@example.com" },
        role: { type: "string", enum: ["USER", "ADMIN"], example: "USER" },
    },
    required: ["id", "email", "role"],
    additionalProperties: false,
};

//Возврат токена
const userTokenResponseSchema = {
    type: "object",
    properties: {
        token: {
            type: "string",
            description: "JWT token containing user data (id, email, role)",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
    },
    required: ["token"],
    additionalProperties: false,
};

const userLoginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
            example: "galadriel@anoldorin.lady",
        },
        password: {
            type: "string",
            example: "StrongPass123",
        },
    },
    required: ["email", "password"],
    additionalProperties: false,
};


const userRegisterSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email", example: "youremail@example.com" },
        password: { type: "string", example: "StrongPass123" },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

// USER updates his email and/or password
const userUpdateSelfSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email", example: "frodo@shire.me" },
        password: { type: "string", example: "NewPass123" },
    },
    required: [],
    additionalProperties: false,
};

// ADMIN updates any user (email, password, role)
const userUpdateAdminSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email", example: "sam@shire.me" },
        password: { type: "string", example: "NewStrongPass123" },
        role: { type: "string", enum: ["USER", "ADMIN"], example: "USER" },
    },
    required: [],
    additionalProperties: false,
};

export { userBaseSchema, userResponseSchema, userRegisterSchema, userLoginSchema, userTokenResponseSchema, userUpdateSelfSchema, userUpdateAdminSchema};