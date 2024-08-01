import { GoogleAuthController } from "@/mainModule/controllers/google-auth.controller";
import { UserChatController }   from "@/mainModule/controllers/user-chat.controller";
import { UserController }       from "@/mainModule/controllers/user.controller";
import { UserChatDataMapper }   from "@/mainModule/data-mappers/user-chat.mapper";
import { UserDataMapper }       from "@/mainModule/data-mappers/user.data-mapper";
import { ChatEntity }           from "@/mainModule/entities/chat.entity";
import { FamousPersonEntity }   from "@/mainModule/entities/famous-person.entity";
import { UserChatEntity }       from "@/mainModule/entities/user-chat.entity";
import { UserEntity }           from "@/mainModule/entities/user.entity";
import { AuthService }          from "@/mainModule/services/auth.service";
import { ChatService }          from "@/mainModule/services/chat.service";
import { FamousPersonService }  from "@/mainModule/services/famous-person.service";
import { GoogleAuthService }    from "@/mainModule/services/google.service";
import { HashService }          from "@/mainModule/services/hash.service";
import { UserChatService }      from "@/mainModule/services/user-chat.service";
import { UserService }          from "@/mainModule/services/user.service";
import { Module }               from "@nestjs/common";
import { JwtModule }            from "@nestjs/jwt";
import { TypeOrmModule }        from "@nestjs/typeorm";

@Module({
  imports: [
    JwtModule.register({
      global     : true,
      secret     : process.env.SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    TypeOrmModule.forFeature([UserChatEntity, UserEntity, ChatEntity, FamousPersonEntity]),
  ],
  controllers: [UserController, GoogleAuthController, UserChatController],
  providers  : [UserService, HashService, AuthService, UserDataMapper, GoogleAuthService, UserChatService, ChatService, FamousPersonService, UserChatDataMapper],
})
export class MainModule { }
