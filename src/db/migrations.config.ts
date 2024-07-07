import { EnvsVariables } from "@/core/env-constants";
import { DataSource }    from "typeorm";

export const dataSource = new DataSource({
  type       : "postgres",
  database   : EnvsVariables.DATABASE_NAME,
  host       : EnvsVariables.DATABASE_HOST,
  username   : EnvsVariables.DATABASE_USER,
  password   : EnvsVariables.DATABASE_PASSWORD,
  port       : EnvsVariables.DATABASE_PORT ? +EnvsVariables.DATABASE_PORT : 3300,
  schema     : "public",
  synchronize: true,
  // url: process.env.DATABASE_URL,
  migrations : [`${__dirname}/../**/migrations/*{.js,.ts}`],
  entities   : [`${__dirname}/../**/*.entity{.js,.ts}`],
});
