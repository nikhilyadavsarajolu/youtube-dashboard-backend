import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Replace the string below with the code you got from the browser
const AUTH_CODE ="4/0AVGzR1C-gjEYz0iJRxlxMcy3qs5TNvngYf-m1TTz-pFtTMaPZmhdoKz-Nz8G5o1Mq3BiEg";

async function getRefreshToken() {
  try {
    const { tokens } = await oauth2Client.getToken(AUTH_CODE);
    console.log("\n✅ Your REFRESH TOKEN is:\n", tokens.refresh_token);
  } catch (err) {
    console.error("❌ Error getting refresh token:", err.message);
  }
}

getRefreshToken();
