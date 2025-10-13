import { apiResponses } from "../../utils/responseTemplates.js";

export default {
  put: {
    tags: ["Cart"],
    summary: "Update device quantity in user's cart",
    description: "Updates the quantity of a specific device in the user's cart.",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["deviceId", "quantity"],
            properties: {
              deviceId: {
                type: "integer",
                example: 5,
                description: "ID of the device to update in the cart",
              },
              quantity: {
                type: "integer",
                example: 2,
                description: "New quantity for the selected device",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        ...apiResponses[200],
        description: "Quantity updated successfully",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ApiResponse" },
            example: {
              status: 200,
              message: "Quantity updated successfully",
              data: {
                deviceId: 5,
                quantity: 2,
              },
            },
          },
        },
      },
      400: apiResponses[400],
      401: apiResponses[401],
      403: apiResponses[403],
      500: apiResponses[500],
    },
  },
};