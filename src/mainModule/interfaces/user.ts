export type UserJWTPayload = {
  id          : string;
  referralCode: string;
  subscribed  : boolean;
  questionLeft: number;
  email       : string;
};
