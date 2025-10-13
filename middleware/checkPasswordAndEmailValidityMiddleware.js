import { emailRule, passwordRule } from "./validators/userValidationRules.js";
import { handleValidationErrors } from "../middleware/helpers/handleValidationErrors.js";

export const checkPasswordAndEmailValidityMiddleware = [
    emailRule,
    passwordRule,
    handleValidationErrors,
];