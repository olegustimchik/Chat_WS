import { MainModule }    from "@/mainModule/main.module";
import { Module }        from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv       from "dotenv";

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type            : "postgres",
      database        : process.env.DATABASE_NAME,
      host            : process.env.DATABASE_HOST,
      username        : process.env.DATABASE_USER,
      password        : process.env.DATABASE_PASSWORD,
      port            : process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3300,
      schema          : "public",
      autoLoadEntities: true,
      synchronize     : false,
      migrationsRun   : false,
      logging         : false,
      entities        : [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations      : [`${__dirname}/**/migrations/*{.js,.ts}`],
    }),
    MainModule],
  controllers: [],
  providers  : [],
})
export class AppModule { }
