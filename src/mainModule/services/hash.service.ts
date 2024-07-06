import { Injectable } from "@nestjs/common";
import { pbkdf2Sync } from "node:crypto";

@Injectable()
export class HashService {
  constructor() { }

  hash(str: string, salt: string): string {
    const genHash = pbkdf2Sync(str, salt, 10000, 64, "sha512").toString("hex");

    return genHash ;
  }

  verify(secret: string, hash: string, salt: string) : boolean {
    return hash === this.hash(secret, salt);
  }
}
