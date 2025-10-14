// import { Sequelize } from "sequelize";
//
// export default new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   dialect: "postgres",
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
// });



import { Sequelize } from "sequelize";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
      "DATABASE_URL is not defined in environment variables. Add it in Render dashboard."
  );
}

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default sequelize;