import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

import "https://deno.land/x/dotenv@v3.2.0/load.ts";
const secrets = {
  clientId: Deno.env.get("clientId"),
  clientSecret: Deno.env.get("clientSecret"),
};
if (!secrets.clientId || !secrets.clientSecret) {
  throw new Error("environment variable clientSecret or clientId not set");
}


export interface User {
  userId: number
  userName: string
  avatarUrl: string
}

export const oauth2Client = new OAuth2Client({
  clientId: secrets.clientId || "",
  clientSecret: secrets.clientSecret || "",
  authorizationEndpointUri: "https://github.com/login/oauth/authorize",
  tokenUri: "https://github.com/login/oauth/access_token",
  redirectUri: "http://localhost:8000",
  defaults: {
    scope: "read:user",
  },
});

export const gitHubApi = {
  async getUserData(accessToken: string): Promise<User> {
   
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    
    const userData = await response.json();
    return {
      userId: userData.id,
      userName: userData.name,
      avatarUrl: userData["avatar_url"],
    };
  }
}