import { UserController }     from "@/mainModule/controllers/user.controller";
import { ChatEntity }         from "@/mainModule/entities/chat.entity";
import { FamousPersonEntity } from "@/mainModule/entities/famous-person.entity";
import { UserChatEntity }     from "@/mainModule/entities/user-chat.entity";
import { UserEntity }         from "@/mainModule/entities/user.entity";
import { HashService }        from "@/mainModule/services/hash.service";
import { UserService }        from "@/mainModule/services/user.service";
import { Module }             from "@nestjs/common";
import { JwtModule }          from "@nestjs/jwt";
import { TypeOrmModule }      from "@nestjs/typeorm";

@Module({
  imports: [
    JwtModule.register({
      global     : true,
      secret     : process.env.SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    TypeOrmModule.forFeature([UserChatEntity, UserEntity, ChatEntity, FamousPersonEntity]),
  ],
  controllers: [UserController],
  providers  : [UserService, HashService],
})
export class MainModule { }
