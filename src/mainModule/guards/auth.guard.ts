import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector }                                                        from "@nestjs/core";
import { JwtService }                                                       from "@nestjs/jwt";
import { Request }                                                          from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const reflect = this.reflector.get<boolean>("isPublic", context.getHandler());
    if (!token || !reflect) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token,
        { secret: process.env.SECRET });
      request.body.user = payload;
    } catch {
      return false || reflect;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
