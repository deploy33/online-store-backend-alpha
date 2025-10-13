const typeBaseSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "Magical Artifacts" },
  },
  required: ["name"],
  additionalProperties: false,
};

const typeCreateSchema = {
  type: "object",
  properties: {
    name: { type: "string", example: "Magical Artifacts" },
  },
  required: ["name"],
  additionalProperties: false,
};

const typeUpdateSchema = {
  type: "object",
  properties: {
    name: { type: "string", example: "Updated Artifact Type" },
  },
  required: ["name"],
  additionalProperties: false,
};

export { typeBaseSchema, typeCreateSchema, typeUpdateSchema };