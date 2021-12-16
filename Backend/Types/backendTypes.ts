export interface UserItem {
  username: String;
  email: String;
  passwordHash: String;
  twoFactorAuth: Boolean;
}

export type UserItemGet = Omit<UserItem, "passwordHash" | "email">;

export interface RequestsUserItem {
  username: String;
  twoFactorAuth: Boolean;
  token: string;
  secret?: string;
  uri?: string;
  qr?: string;
}
