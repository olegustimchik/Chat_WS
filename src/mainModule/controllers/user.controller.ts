import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { isUUID }                                           from "class-validator";

import { UserService }                                      from "../services/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }
}
