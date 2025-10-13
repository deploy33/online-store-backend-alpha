import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import paths from "./paths/index.js";


import {userBaseSchema, userRegisterSchema, userResponseSchema, userTokenResponseSchema, userUpdateAdminSchema, userUpdateSelfSchema, userLoginSchema} from "./schemas/user.schema.js";
import {
  deviceBaseSchema,
  deviceCreateSchema,
  deviceUpdateSchema,
} from "./schemas/device.schema.js";
import { cartBaseSchema, cartDeviceSchema } from "./schemas/cart.schema.js";
import { brandBaseSchema, brandCreateSchema, brandUpdateSchema } from "./schemas/brand.schema.js";
import { typeBaseSchema, typeCreateSchema, typeUpdateSchema } from "./schemas/type.schema.js";
import { ratingBaseSchema, ratingCreateSchema } from "./schemas/rating.schema.js";
import ApiResponse from "./components/schemas/ApiResponse.js";

const swaggerDoc = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Store API",
      version: "1.0.0",
      description: "API documentation for the online store project",
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas: {
        ApiResponse,
        // User
        UserBase: userBaseSchema,
        UserResponse: userResponseSchema,
        UserRegister: userRegisterSchema,
        UserUpdateSelf: userUpdateSelfSchema,
        UserUpdateAdmin: userUpdateAdminSchema,
        UserTokenResponse: userTokenResponseSchema,
        UserLogin: userLoginSchema,

        // Device
        DeviceBase: deviceBaseSchema,
        DeviceCreate: deviceCreateSchema,
        DeviceUpdate: deviceUpdateSchema,

        // Cart
        CartBase: cartBaseSchema,
        CartDevice: cartDeviceSchema,

        // Brand
        BrandBase: brandBaseSchema,
        BrandCreate: brandCreateSchema,
        BrandUpdate: brandUpdateSchema,

        // Type
        TypeBase: typeBaseSchema,
        TypeCreate: typeCreateSchema,
        TypeUpdate: typeUpdateSchema,

        //Rating
        RatingBase: ratingBaseSchema,
        RatingCreate: ratingCreateSchema,
      },
    },
    security: [{ bearerAuth: [] }],
    paths,
  },
  apis: [],
});

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}