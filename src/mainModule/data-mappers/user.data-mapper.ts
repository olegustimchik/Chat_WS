import { UserEntity }     from "@/mainModule/entities/user.entity";
import { UserJWTPayload } from "@/mainModule/interfaces/user";
import { Injectable }     from "@nestjs/common";

@Injectable()
export class UserDataMapper {
  toJWTPayload(entity: UserEntity): UserJWTPayload {
    const { email, id, questionLeft, referralCode, subscribed } = entity;

    return {
      id, referralCode, email, questionLeft, subscribed,
    };
  }
}
