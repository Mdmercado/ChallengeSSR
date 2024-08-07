import { DataSource } from "typeorm";
import { User } from "../entities/users.entity";
import { Role } from "../entities/roles.entity";

export const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "challenge_db",
  entities: [User, Role],
  // logging: true,
  synchronize: true,
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
