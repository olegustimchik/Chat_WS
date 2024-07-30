import { UserEntity }                   from "@/mainModule/entities/user.entity";
import { UserJWTPayload, UserResponse } from "@/mainModule/types/user";
import { Injectable }                   from "@nestjs/common";

@Injectable()
export class UserDataMapper {
  toJWTPayload(entity: UserEntity): UserJWTPayload {
    const { id } = entity;

    return { id };
  }

  toResponse(entity: UserEntity): UserResponse {
    const { email, name, nextPayment } = entity;

    return {
      email, name, nextPayment,
    };
  }
}
