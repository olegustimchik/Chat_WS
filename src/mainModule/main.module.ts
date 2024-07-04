import { Module }             from "@nestjs/common";
import { TypeOrmModule }      from "@nestjs/typeorm";

import { ChatEntity }         from "./entities/chat.entity";
import { FamousPersonEntity } from "./entities/famousPerson.entity";
import { UserEntity }         from "./entities/user.entity";
import { UserChatEntity }     from "./entities/userChat.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserChatEntity, UserEntity, ChatEntity, FamousPersonEntity]),
  ],
  controllers: [],
  providers  : [],
})
export class MainModule { }
