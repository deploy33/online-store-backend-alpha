import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  get: {
    tags: ["Type"],
    summary: "Get type by ID",
    description: "Retrieve a single type by its ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the type",
        schema: { type: "integer", example: 1 },
      },
    ],
    responses: {
      200: {
        description: "Type retrieved successfully",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TypeBase" },
          },
        },
      },
      404: { description: "Type not found" },
      ...apiResponses,
    },
  },
};