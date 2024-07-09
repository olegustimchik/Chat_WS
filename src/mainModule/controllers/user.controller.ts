import { EnvsVariables }                                                from "@/core/env-constants";
import { UserDataMapper }                                               from "@/mainModule/data-mappers/user.data-mapper";
import { UpdateUser, UserSignIn, UserSignUp }                           from "@/mainModule/dto/user.dto";
import { AuthGuard }                                                    from "@/mainModule/guards/auth.guards";
import { AuthService }                                                  from "@/mainModule/services/auth.service";
import { HashService }                                                  from "@/mainModule/services/hash.service";
import { UserService }                                                  from "@/mainModule/services/user.service";
import { Controller, Post, Res, HttpStatus, Body, UseGuards, Req, Put } from "@nestjs/common";
import { Request, Response }                                            from "express";

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
      this.userService.updateQuestionsByReferral(referralCode);
    }

    const user = await this.userService.saveUser(email, password, EnvsVariables.PASSWORD_SALT);

    return res.status(HttpStatus.OK).json({
      message    : "user saved",
      accessToken: await this.authService.signIn(this.userDataMapper.toJWTPayload(user)),
    });
  }

  @Post("signIn")
  async signIn(@Body() userDTO: UserSignIn, @Res() res: Response) {
    const { email, password } = userDTO;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "This email not registered" });
    }

    if (!user.password || !this.hashService.verify(password, user.password, EnvsVariables.PASSWORD_SALT)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "password doesn't match" });
    }

    return res.status(HttpStatus.OK).json({
      message    : "user logged in",
      accessToken: await this.authService.signIn(this.userDataMapper.toJWTPayload(user)),
    });
  }

  @UseGuards(AuthGuard)
  @Put("updateUser")
  async updateName(@Req() req: Request, @Body() body: UpdateUser, @Res() res: Response) {
    const { email, name, password } = body;
    const { user } = req.body;
    let userFromDB = await this.userService.findUserById(user.id);

    if (!userFromDB) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "This user not exists" });
    }

    if (email) {
      userFromDB.email = email;
    }

    if (name) {
      userFromDB.name = name;
    }

    if (password) {
      userFromDB.password = this.hashService.hash(password, EnvsVariables.PASSWORD_SALT);
    }
    userFromDB = await this.userService.updateUser(userFromDB);

    return res.json({ message: "The user successfully updated", accessToken: await this.authService.signIn(this.userDataMapper.toJWTPayload(userFromDB)) });
  }
}
