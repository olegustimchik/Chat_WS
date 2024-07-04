import { Module }        from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MainModule }    from "./mainModule/main.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type            : "postgres",
      host            : process.env.DATABASE_HOST,
      username        : process.env.DATABASE_USER,
      password        : process.env.DATABASE_PASSWORD,
      port            : process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3300,
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
