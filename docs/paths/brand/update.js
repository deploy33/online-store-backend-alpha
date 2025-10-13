import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  put: {
    tags: ["Brand"],
    summary: "Update an existing brand (ADMIN only)",
    description: "Allows an admin to update an existing brand by ID",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the brand to update",
        schema: { type: "integer", example: 1 },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/BrandUpdate" },
        },
      },
    },
    responses: {
      200: {
        description: "Brand updated successfully",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/BrandBase" },
          },
        },
      },
      400: { description: "Bad request" },
      401: { description: "Unauthorized" },
      403: { description: "Forbidden - Admin access required" },
      404: { description: "Brand not found" },
      ...apiResponses,
    },
  },
};