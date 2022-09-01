import { oauth2Client } from "utils/oauth2.ts";

export const handler = (): Response => {
    return Response.redirect(oauth2Client.code.getAuthorizationUri(), 302);
};