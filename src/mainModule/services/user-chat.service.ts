import { ChatEntity }       from "@/mainModule/entities/chat.entity";
import { UserChatEntity }   from "@/mainModule/entities/user-chat.entity";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

@Injectable()
export class UserChatService {
  constructor(@InjectRepository(UserChatEntity) private readonly userChatRepository: Repository<UserChatEntity>) { }

  async getIndividualChat(famousPersonID: number, userID: string):Promise<UserChatEntity> {
    return await this.userChatRepository.findOne({ where: { userID, famousPersonID } });
  }

  async saveChat(famousPersonID: number, userID: string, chat: ChatEntity) {
    const userChat = await this.userChatRepository.findOne({ where: { famousPersonID, userID } });
    userChat.chat.push(chat);

    return await this.userChatRepository.save(userChat);
  }
}
