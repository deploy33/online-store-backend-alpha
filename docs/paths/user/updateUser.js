import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  put: {
    tags: ["User"],
    summary: "Update user (ADMIN only)",
    security: [{ bearerAuth: [],
    responses: apiResponses
}],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" },
        description: "User ID to update",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserUpdateAdmin" },
          example: {
            email: "frodo@shire.me",
            password: "NewStrongPass123",
            role: "USER"
          }
        }
      }
    },
    responses: {
      200: {
        description: "User updated successfully",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UserResponse" },
            example: {
              id: 22,
              email: "frodo@shire.me",
              role: "USER"
            }
          }
        }
      },
      400: { description: "Bad request" },
      401: { description: "Unauthorized" },
      403: { description: "Forbidden" },
      404: { description: "Not found" },
      500: { description: "Internal server error" },
    },
  },
};