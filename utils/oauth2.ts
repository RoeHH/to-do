import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
const secrets = {
  clientId: Deno.env.get("clientId"),
  clientSecret: Deno.env.get("clientSecret"),
};

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
  async getUserData(accessToken: string) {
    console.log(accessToken);
    
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
      userId: userData.id as number,
      userName: userData.name as string,
      avatarUrl: userData["avatar_url"] as string,
    };
  }
}