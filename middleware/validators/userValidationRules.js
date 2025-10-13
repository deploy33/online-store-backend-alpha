import { body } from "express-validator";

export const emailRule = body("email")
    .isEmail()
    .withMessage("Invalid email format");

export const passwordRule = body("password")
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter and one number");