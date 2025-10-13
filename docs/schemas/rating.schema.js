export const ratingBaseSchema = {
    type: "object",
    properties: {
        id: { type: "integer", example: 1 },
        rate: { type: "integer", example: 5 },
        userId: { type: "integer", example: 2 },
        deviceId: { type: "integer", example: 10 },
    },
};

export const ratingCreateSchema = {
    type: "object",
    required: ["rate", "deviceId"],
    properties: {
        rate: { type: "integer", min: 1, max: 5, example: 4 },
        deviceId: { type: "integer", example: 10 },
    },
};