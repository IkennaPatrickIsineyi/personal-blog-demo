import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD || '',
    cookieName: process.env.SESSION_NAME || '',
    ttl: 86400
}