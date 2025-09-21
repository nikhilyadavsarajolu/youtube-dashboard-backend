import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// create OAuth client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost"   // Redirect URI you set in Google Cloud
);

// Scopes needed for YouTube
const scopes = [
  "https://www.googleapis.com/auth/youtube.force-ssl"
];

// Generate consent URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline", // important! offline gives refresh token
  scope: scopes,
});

console.log("Authorize this app by visiting this url:\n", authUrl);
