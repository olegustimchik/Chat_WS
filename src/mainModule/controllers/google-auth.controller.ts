import { UserDataMapper }                         from "@/mainModule/data-mappers/user.data-mapper";
import { AuthService }                            from "@/mainModule/services/auth.service";
import { GoogleAuthService }                      from "@/mainModule/services/google.service";
import { UserService }                            from "@/mainModule/services/user.service";
import { Controller, Get, Body, HttpStatus, Res } from "@nestjs/common";
import { Response }                               from "express";

@Controller("google")
export class GoogleAuthController {
  constructor(private googleService: GoogleAuthService,
    private userService: UserService,
    private authService: AuthService,
    private userDataMapper: UserDataMapper) { }

  @Get("auth")
  async googleAuth(@Body("token") token: string, @Res() res: Response) {
    const payloads = (await this.googleService.verifyToken(token)).getPayload();
    let user = await this.userService.findUserByEmail(payloads.email);
    if (!user) {
      user = await this.userService.saveGoogleAuthUser(payloads.email, payloads.sub);
    }

    return res.status(HttpStatus.OK).json({ message: "user loged", accessToken: await this.authService.signIn(this.userDataMapper.toJWTPayload(user)) });
  }
}
