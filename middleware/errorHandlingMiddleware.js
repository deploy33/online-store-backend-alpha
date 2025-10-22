import ApiError from "../error/ApiError.js";
import { sendResponse } from "../utils/sendResponse.js";

export default (err, req, res, next) => {
  const status = err instanceof ApiError ? err.status : 500;
  const message = err instanceof ApiError ? err.message : "Internal server error";

  // Лог только в режиме разработки
  // if (process.env.NODE_ENV !== "production") {
  //   const timestamp = new Date().toISOString();
  //   const logType = status >= 500 ? "ERROR" : "WARN";
  //   console.error(`[${timestamp}] [${logType}] ${req.method} ${req.originalUrl} → ${message}`);
  // }

  return sendResponse(res, status, message);
};