interface UserAuth {
  confirmed: boolean;
  email: string;
  user_id: number;
  role: string;
  status: string;
  completed:boolean
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

interface InfluencerData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  profile_image_url: string;
  interests: string[];
  social_media_links
}
