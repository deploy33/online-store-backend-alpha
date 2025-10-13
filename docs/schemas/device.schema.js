const deviceBaseSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "Isengard fortress" },
    price: {
      type: "string",
      example: "250.00",
      description: "Device price (up to two decimal places)"
    },
    rating: { type: "number", example: 5 },
    img: { type: "string", example: "blade.jpg" },
    typeId: { type: "integer", example: 2 },
    brandId: { type: "integer", example: 1 },
  },
  required: ["name", "price"],
  additionalProperties: false,
};

const deviceCreateSchema = {
  type: "object",
  properties: {
    name: { type: "string", example: "Lightsaber" },
    price: {
      type: "string",
      example: "333.10",
      description: "Device price (string with optional decimal part, e.g. '199.99')"
    },
    typeId: { type: "integer", example: 2 },
    brandId: { type: "integer", example: 1 },
    img: { type: "string", format: "binary" },
  },
  required: ["name", "price", "typeId", "brandId", "img"],
  additionalProperties: false,
};

const deviceUpdateSchema = {
  type: "object",
  properties: {
    name: { type: "string", example: "Updated Lightsaber" },
    price: {
      type: "string",
      example: "499.99",
      description: "New price for the device"
    },
    typeId: { type: "integer", example: 2 },
    brandId: { type: "integer", example: 1 },
  },
  required: ["name", "price", "typeId", "brandId"],
  additionalProperties: false,
};

export { deviceBaseSchema, deviceCreateSchema, deviceUpdateSchema };