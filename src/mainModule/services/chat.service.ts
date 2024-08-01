import { ChatEntity }       from "@/mainModule/entities/chat.entity";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

@Injectable()
export class ChatService {
  constructor(@InjectRepository(ChatEntity) private readonly chatRepository: Repository<ChatEntity>) { }

  async getByID(id: string):Promise<ChatEntity> {
    return await this.chatRepository.findOne({ where: { id } });
  }

  async saveMessage(content: string, role: boolean, userID: string): Promise<ChatEntity> {
    return await this.chatRepository.save({
      content, role, userID,
    });
  }

  async findIndividualChatByUserID(userID: string, famousPersonID: number): Promise<Array<ChatEntity>> {
    return await this.chatRepository.find({ where: { userChat: { userID, famousPersonID } } });
  }
}
