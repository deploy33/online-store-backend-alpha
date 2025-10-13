const brandBaseSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
      description: "Unique brand identifier",
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      example: "Orkish",
      description: "Brand name (2–50 characters)",
    },
  },
  required: ["id", "name"],
  additionalProperties: false,
};

const brandCreateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      example: "Orkish",
      description: "Brand name (2–50 characters)",
    },
  },
  required: ["name"],
  additionalProperties: false,
};

const brandUpdateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      example: "Orkish",
      description: "Updated brand name (2–50 characters)",
    },
  },
  required: ["name"],
  additionalProperties: false,
};

export { brandBaseSchema, brandCreateSchema, brandUpdateSchema };