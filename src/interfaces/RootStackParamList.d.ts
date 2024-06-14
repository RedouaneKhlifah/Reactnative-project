type RootStackParamList = {
  Home: undefined;
  ContactMail: undefined;
  Login: undefined;
  Signup: undefined;
  AnnouncePage: undefined;
  RedirectMail: undefined;
  RoleSelectionScreen: undefined;
  ProfileScreen: undefined;
  Profile: undefined;
  OffersScreen: {categoryId: number};
  BusinessDetails: undefined;
  BusinessProfile: undefined;
  Protected: undefined;
  Verification: undefined;
};

type RootStackParamKeys = keyof RootStackParamList;
