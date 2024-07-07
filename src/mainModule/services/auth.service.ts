import { UserJWTPayload } from "@/mainModule/interfaces/user";
import { Injectable }     from "@nestjs/common";
import { JwtService }     from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(payload: UserJWTPayload): Promise<{ access_token: string }> {
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
