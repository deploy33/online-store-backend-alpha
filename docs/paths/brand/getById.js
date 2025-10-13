import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  get: {
    tags: ["Brand"],
    summary: "Get brand by ID",
    description: "Get a specific brand by its ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", example: 1 },
        description: "ID of the brand to retrieve",
      },
    ],
    responses: {
      200: {
        description: "Brand retrieved successfully",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/BrandBase" },
          },
        },
      },
      404: { description: "Brand not found" },
      ...apiResponses,
    },
  },
};