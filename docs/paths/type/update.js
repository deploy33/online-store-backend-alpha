import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  put: {
    tags: ["Type"],
    summary: "Update an existing product type (ADMIN only)",
    description: "Allows an admin to update an existing product type by ID",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the type to update",
        schema: { type: "integer", example: 1 },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/TypeUpdate" },
        },
      },
    },
    responses: {
      200: {
        description: "Type updated successfully",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TypeBase" },
          },
        },
      },
      400: { description: "Bad request" },
      401: { description: "Unauthorized" },
      403: { description: "Forbidden - Admin access required" },
      404: { description: "Type not found" },
      ...apiResponses,
    },
  },
};