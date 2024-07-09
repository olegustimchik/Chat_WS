import * as  dotenv from "dotenv";

dotenv.config();

export const EnvsVariables = {
  TZ               : process.env.TZ,
  DATABASE_NAME    : process.env.DATABASE_NAME,
  DATABASE_USER    : process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT    : process.env.DATABASE_PORT,
  DATABASE_HOST    : process.env.DATABASE_HOST,
  DATABASE_URL     : process.env.DATABASE_URL,
  DATABASE_LOGGING : process.env.DATABASE_LOGGING,
  CORS_ORIGINS     : process.env.CORS_ORIGINS,
  PORT             : process.env.PORT,
  PASSWORD_SALT    : process.env.PASSWORD_SALT,
  SECRET           : process.env.SECRET,
  REFERRAL_SALT    : process.env.REFERRAL_SALT,

  GOOGLE_CLIENT_ID    : process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
