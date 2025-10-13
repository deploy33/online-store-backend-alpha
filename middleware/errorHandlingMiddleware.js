import ApiError from "../error/ApiError.js";
import { sendResponse } from "../utils/sendResponse.js";

export default (err, req, res, next) => {
  console.log("🔥 errorHandlingMiddleware triggered:", err);
  const status = err instanceof ApiError ? err.status : 500;
  const message = err instanceof ApiError ? err.message : "Internal server error";

  const timestamp = new Date().toISOString();
  const logType = status >= 500 ? "ERROR" : "WARN";

  console.log(`[${timestamp}] [${logType}] ${req.method} ${req.originalUrl} → ${message}`);

  return sendResponse(res, status, message);
};