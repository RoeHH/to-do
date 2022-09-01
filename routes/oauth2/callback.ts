import { HandlerContext, PageProps } from "$fresh/server.ts";
import { oauth2Client } from "utils/oauth2.ts";
import { gitHubApi } from "https://raw.githubusercontent.com/denoland/showcase_chat/d947bb39b2e5487f62bd797ed5a14ea6999549de/communication/github.ts";

export const handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
    // Exchange the authorization code for an access token
  const tokens = await oauth2Client.code.getToken(req.url);

    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
    const userData = await response.json();

  return Response.json(userData);
};
