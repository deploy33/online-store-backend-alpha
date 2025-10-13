import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  put: {
    tags: ["Device"],
    summary: "Update device (ADMIN only)",
    description: "Updates an existing device. Requires ADMIN role.",
    security: [{ bearerAuth: [] }],
    parameters: [
      { name: "id", in: "path", schema: { type: "integer" }, required: true, description: "ID of the device to update" },
    ],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "iPhone 15" },
              price: { type: "number", example: 1300 },
              brandId: { type: "integer", example: 1 },
              typeId: { type: "integer", example: 1 },
              img: { type: "string", format: "binary" },
              info: { type: "string", example: '[{"title":"Screen","description":"6.1 inch"}]' },
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...apiResponses[200],
        description: "Device updated successfully",
      },
      400: apiResponses[400],
      401: apiResponses[401],
      403: apiResponses[403],
      404: apiResponses[404],
      500: apiResponses[500],
    },
  },
};