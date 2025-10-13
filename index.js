import "dotenv/config";
import express from "express";
import router from "./routes/index.js";
import sequelize from "./db.js";
import cors from "cors";
import { setupSwagger } from "./docs/swagger.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5003;

const api = express();
api.use(cors());
api.use(express.json());
api.use(fileUpload({}));
api.use("/api", router);
api.use("/static", express.static(path.resolve(__dirname, "static")));
setupSwagger(api);
api.use(errorHandlingMiddleware);

const start = async () => {
  try {
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_USER:", process.env.DB_USER);
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync({ alter: true });
    console.log("Tables synced!");
    api.listen(PORT, () => console.log(`Launched at ${PORT}`));
  } catch (e) {
    console.log("Error during startup:", e);
  }
};
start();