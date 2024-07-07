import { EnvsVariables } from "@/core/env-constants";
import { MainModule }    from "@/mainModule/main.module";
import { Module }        from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type            : "postgres",
      database        : EnvsVariables.DATABASE_NAME,
      host            : EnvsVariables.DATABASE_HOST,
      username        : EnvsVariables.DATABASE_USER,
      password        : EnvsVariables.DATABASE_PASSWORD,
      port            : EnvsVariables.DATABASE_PORT ? +EnvsVariables.DATABASE_PORT : 3300,
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
