import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  delete: {
    tags: ["User"],
    summary: "Delete user (ADMIN only)",
    description: "Delete a user by ID",
    security: [{ bearerAuth: [],
    responses: apiResponses
}],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" },
        description: "User ID",
      },
    ],
    responses: {
      200: {
        description: "User deleted successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "User deleted successfully" },
              },
            },
          },
        },
      },
      401: { description: "Unauthorized" },
      403: { description: "Forbidden - Admin access required" },
      404: { description: "User not found" },
    },
  },
};
