import { UserChatDataMapper }                                                from "@/mainModule/data-mappers/user-chat.mapper";
import { UserChatRequest }                                                   from "@/mainModule/dto/user-chat.dto";
import { ChatService }                                                       from "@/mainModule/services/chat.service";
import { FamousPersonService }                                               from "@/mainModule/services/famous-person.service";
import { UserChatService }                                                   from "@/mainModule/services/user-chat.service";
import { UserService }                                                       from "@/mainModule/services/user.service";
import { Controller, Post, Res, HttpStatus, Body, UseGuards, Req, Put, Get } from "@nestjs/common";
import { JwtService }                                                        from "@nestjs/jwt";
import { Request, Response }                                                 from "express";

@Controller("userChat")
export class UserChatController {
  constructor(private jwtService: JwtService,
    private famousPersonService: FamousPersonService,
    private chatService: ChatService,
    private userChatService: UserChatService,
    private userService: UserService,
    private userChatDataMapper: UserChatDataMapper) { }

  @Get("/")
  async getChat(@Req() req: Request, @Res() res: Response, @Body() body: UserChatRequest) {
    const [, token] = req.headers.authorization?.split(" ") ?? [];
    console.log(token);
    const user = await this.jwtService.verifyAsync(token,
      { secret: process.env.SECRET });

    const famousPerson = await this.famousPersonService.getById(body.famousPersonId);
    if (!famousPerson) {
      return res.status(HttpStatus.NO_CONTENT).json({ message: "Not found celebrity with this id" });
    }

    const userFromDB = await this.userService.findUserById(user.id);
    if (!user.id || !userFromDB) {
      return res.status(HttpStatus.OK).json({ messages: [{ role: false, content: famousPerson.description }] });
    }

    const userChat = await this.userChatService.getIndividualChat(famousPerson.id, userFromDB.id);
    if (!userChat) {
      const chat = await this.chatService.saveMessage(famousPerson.description, false, userFromDB.id);
      await this.userChatService.saveChat(famousPerson.id, userFromDB.id, chat);

      return res.status(HttpStatus.OK).json({ messages: [{ role: false, content: famousPerson.description }] });
    }

    const chat = this.userChatDataMapper.toResponse(userChat);

    return res.status(HttpStatus.OK).json({ messages: chat });
  }
}
