import { EnvsVariables }             from "@/core/env-constants";
import { Injectable }                from "@nestjs/common";
import { OAuth2Client, LoginTicket } from "google-auth-library";

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;
  constructor() {
    this.client = new OAuth2Client(EnvsVariables.GOOGLE_CLIENT_ID, EnvsVariables.GOOGLE_CLIENT_SECRET);
  }

  async verifyToken(token: string): Promise<LoginTicket> {
    return this.client.verifyIdToken({ idToken: token });
  }
}
