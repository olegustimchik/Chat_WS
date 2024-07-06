import { UserDataMapper }                          from "@/mainModule/data-mappares/user.data-mapper";
import { UserSignIn, UserSignUp }                  from "@/mainModule/dto/user.dto";
import { AuthService }                             from "@/mainModule/services/auth.service";
import { HashService }                             from "@/mainModule/services/hash.service";
import { UserService }                             from "@/mainModule/services/user.service";
import { Controller, Post, Res, HttpStatus, Body } from "@nestjs/common";
import { Response }                                from "express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService,
    private authService: AuthService,
    private userDataMapper: UserDataMapper,
    private hashService: HashService) { }

  @Post("register")
  async postUser(@Body() userDTO: UserSignUp, @Res() res: Response) {
    const { email, password, referralCode } = userDTO;

    if (await this.userService.findUserByEmail(email)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "this email already in use" });
    }

    if (referralCode) {
      this.userService.updateQuestions(referralCode);
    }

    const user = await this.userService.saveUser(email, password, process.env.PASSWORD_SALT);

    return res.status(HttpStatus.OK).json({
      message    : "user saved",
      accessToken: this.authService.signIn(this.userDataMapper.categoryToJWTPayload(user)),
    });
  }

  @Post("signIn")
  async signIn(@Body() userDTO: UserSignIn, @Res() res: Response) {
    const { email, password } = userDTO;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "This email not registered" });
    }

    if (this.hashService.verify(password, user.password, process.env.PASSWORD_SALT)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "password doesn't match" });
    }

    return res.status(HttpStatus.OK).json({
      message    : "user logged in",
      accessToken: this.authService.signIn(this.userDataMapper.categoryToJWTPayload(user)),
    });
  }
}
