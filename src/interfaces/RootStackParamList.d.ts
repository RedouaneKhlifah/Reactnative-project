interface UserAuth {
  confirmed: boolean;
  email: string;
  user_id: number;
  role: string;
  status: string;
  completed: boolean;
}

type RootStackParamList = {
  Home: undefined;
  ContactMail: undefined;
  Login: undefined;
  Signup: undefined;
  AnnouncePage: {id: number};
  RedirectMail: undefined;
  RoleSelectionScreen: undefined;
  ProfileScreen: undefined;
  Profile: {id: number};
  OffersScreen: {categoryId: number; name: string};
  BusinessDetails: undefined;
  BusinessProfile: {id: number};
  Protected: undefined;
  Verification: undefined;
  '': undefined;
};

type RootStackParamKeys = keyof RootStackParamList;
