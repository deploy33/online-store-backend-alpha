const cartBaseSchema = {
    type: "object",
    properties: {
        id: { type: "integer", example: 1 },
        userId: { type: "integer", example: 1 },
    },
    required: ["userId"],
    additionalProperties: false,
};

const cartDeviceSchema = {
    type: "object",
    properties: {
        id: { type: "integer", example: 1 },
        cartId: { type: "integer", example: 1 },
        deviceId: { type: "integer", example: 1 },
        quantity: { type: "integer", example: 1 },
    },
    required: ["cartId", "deviceId"],
    additionalProperties: false,
};

export { cartBaseSchema, cartDeviceSchema };