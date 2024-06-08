interface UserAuth {
  confirmed: boolean;
  email: string;
  user_id: number;
  role: string;
  status: string;
}
interface UserTokenAuth {
  token: string;
  token_id: number;
  user: UserAuth;
}

export enum status {
  pending = 'pending',
  verified = 'verified',
}

export enum userRole {
  business = 'business',
  influencer = 'influencer',
}
