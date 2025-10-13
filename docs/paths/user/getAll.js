import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  get: {
    tags: ["User"],
    summary: "Get all users (ADMIN only)",
    description: "Returns all users. Only authorized users with role ADMIN can access this endpoint.",
    security: [{ bearerAuth: [] }], // требует JWT токен
    responses: {
      200: {
        ...apiResponses[200],
        description: "List of all users",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ApiResponse" },
            example: {
              status: 200,
              message: "User list fetched successfully",
              data: {
                users: [
                  {
                    id: 1,
                    email: "admin@example.com",
                    role: "ADMIN",
                    createdAt: "2025-10-13T06:00:00.000Z",
                  },
                  {
                    id: 2,
                    email: "user1@example.com",
                    role: "USER",
                    createdAt: "2025-10-12T18:00:00.000Z",
                  },
                ],
              },
            },
          },
        },
      },
      401: apiResponses[401], // если токен отсутствует или некорректен
      403: apiResponses[403], // если пользователь не админ
      500: apiResponses[500],
    },
  },
};