import { UserChatEntity }  from "@/mainModule/entities/user-chat.entity";
import { UserChatMessage } from "@/mainModule/types/user-chat";
import { Injectable }      from "@nestjs/common";

@Injectable()
export class UserChatDataMapper {
  toResponse(entity: UserChatEntity): Array<UserChatMessage> {
    const {  chat: chats } = entity;
    const messages: Array<UserChatMessage> = chats.map(chat => {
      return { content: chat.content, role: chat.role };
    });

    return messages;
  }
}
