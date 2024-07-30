import { UserDataMapper }                                    from "@/mainModule/data-mappers/user.data-mapper";
import { AuthService }                                       from "@/mainModule/services/auth.service";
import { GoogleAuthService }                                 from "@/mainModule/services/google.service";
import { UserService }                                       from "@/mainModule/services/user.service";
import { Controller, Get, Body, HttpStatus, Res, Req, Post } from "@nestjs/common";
import { Request, Response }                                 from "express";

@Controller("google")
export class GoogleAuthController {
  constructor(private googleService: GoogleAuthService,
    private userService: UserService,
    private authService: AuthService,
    private userDataMapper: UserDataMapper) { }

  @Post("auth")
  async googleAuth(@Req() req: Request, @Res() res: Response) {
    console.log(req.query);
    console.log(req.body.code);
    console.log(await this.googleService.getAccessToken(req.body.code));
  }

  @Get("callback")
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    console.log("callback");
    if (!req.query.token || typeof req.query.token !== "string") {
      console.log(400);

      return res.status(400).send();
    }
    console.log(3);
    this.googleService.getAccessToken(req.query.token);

    return res.status(200);
  }
}
