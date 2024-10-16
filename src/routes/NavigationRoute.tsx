import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoleSelectionScreen from '../screen/RoleSelectionScreen';
import ProfileScreen from '../screen/ProfileScreen';
import Home from '../screen/Home';
import AnnouncePage from './../screen/AnnouncePage';
import LoginScreen from './../screen/auth screens/LoginScreen';
import SignupScreen from './../screen/auth screens/SignupScreen';
import Profile from './../screen/influencer/Profile';
import RedirectMail from './../screen/auth screens/RedirectMail';
import ContactMail from './../screen/mail/ContactMail';
import BusinessDetails from './../screen/buisness/BusinessDetails';
import BusinessProfile from './../screen/buisness/BusinessProfile';
import ProtectedRoute from './ProtectedRoutes';
import NotificationScreen from '../screen/mail/NotificationScreen';
import OffersScreen from '../screen/OffersScreen';
import {useAuth} from '../store/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import {RootStackParamList} from '../interfaces/RootStackParamList';

type ScreenMapItems = {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>; // Adjust this type based on your actual component type
};
export const NavigationRoute: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const {userData, isLoading, isAuthenticated} = useAuth();

  const loggedScreen: ScreenMapItems[] = [
    {name: 'ContactMail', component: ContactMail},
    {name: 'RoleSelectionScreen', component: RoleSelectionScreen},
    {name: 'Login', component: LoginScreen},
    {name: 'Signup', component: SignupScreen},
    {name: 'Profile', component: Profile},
    {name: 'ProfileScreen', component: ProfileScreen},
    {name: 'AnnouncePage', component: AnnouncePage},
    {name: 'OffersScreen', component: OffersScreen},
    {name: 'RedirectMail', component: RedirectMail},
    {name: 'Verification', component: NotificationScreen},
    {name: 'BusinessDetails', component: BusinessDetails},
    {name: 'BusinessProfile', component: BusinessProfile},
  ];

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const initialRouteName = !userData
    ? 'ContactMail'
    : userData.confirmed === false
    ? 'RedirectMail'
    : userData.confirmed === true && !userData.completed
    ? userData.role === 'influencer'
      ? 'ProfileScreen'
      : 'BusinessDetails'
    : userData.status !== 'approved'
    ? 'Verification'
    : userData.role === 'business'
    ? 'BusinessProfile'
    : 'Home';

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {loggedScreen?.map((screen, index) => {
        return (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={{headerShown: false}}
          />
        );
      })}
      <Stack.Screen name="Home" options={{headerShown: false}}>
        {() => (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
