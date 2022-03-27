export interface AuthState {
    accessToken: string | null;
    user: UserInfo | null;
}

export interface UserInfo {
  id: number;
  tel: string;
  nickname: string | null;
  is_admin: boolean | null;
  is_sms_verified: number;
  game_attributes: any;
  created_at: string;
}
