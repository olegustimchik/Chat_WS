import { UserEntity }     from "@/mainModule/entities/user.entity";
import { UserJWTPayload } from "@/mainModule/interfaces/user";
import { Injectable }     from "@nestjs/common";

@Injectable()
export class UserDataMapper {
  toJWTPayload(entity: UserEntity): UserJWTPayload {
    const { id } = entity;

    return { id };
  }
}
