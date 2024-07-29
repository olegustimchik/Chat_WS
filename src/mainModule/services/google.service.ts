import { EnvsVariables } from "@/core/env-constants";
import { Injectable }    from "@nestjs/common";
import { google, Auth }  from "googleapis";

@Injectable()
export class GoogleAuthService {
  private client: Auth.OAuth2Client;
  constructor() {
    this.client = new google.auth.OAuth2({
      clientId    : EnvsVariables.GOOGLE_CLIENT_ID,
      clientSecret: EnvsVariables.GOOGLE_CLIENT_SECRET,
      redirectUri : "postmessage",
    });
  }

  async getAuthUrl(): Promise<string> {
    const authorizationUrl = this.client.generateAuthUrl({
      access_type  : "online",
      response_type: "code",
      prompt       : "consent",
      scope        : [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });

    return authorizationUrl;
  }

  async getAccessToken(token: string) {
    try {
      const { tokens } = await this.client.getToken(token);
      console.log(await this.client.getToken(token));
      // this.client.setCredentials(tokens);
      console.log(tokens);
      console.log(this.client.credentials);
    } catch (err) {
      console.log(err);
    }
  }
}
