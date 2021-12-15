export interface UserItem {
  username: String;
  email: String;
  passwordHash: String;
  twoFactorAuth: Boolean;
}

export interface RequestsUserItem {
  username: String;
  twoFactorAuth: Boolean;
  token: string;
  secret?: string;
  uri?: string;
  qr?: string;
}
