export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type AuthData = {
  email: string;
  password: string;
}
