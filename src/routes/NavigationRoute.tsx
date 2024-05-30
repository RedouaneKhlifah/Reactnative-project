import { useAuth } from "../store/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RoleSelectionScreen from '../screen/RoleSelectionScreen';
import ProfileScreen from '../screen/ProfileScreen';
import Home from '../screen/Home';
import CategorySection from '../screen/CategorySection';
import AnnouncePage from './../screen/AnnouncePage';
import LoginScreen from './../screen/auth screens/LoginScreen';
import SignupScreen from './../screen/auth screens/SignupScreen';
import Profile from "./../screen/influencer/Profile";
import RedirectMail from './../screen/auth screens/RedirectMail';
import ContactMail from './../screen/mail/ContactMail';
import BusinessDetails from './../screen/buisness/BusinessDetails';
import BusinessProfile from './../screen/buisness/BusinessProfile';

export const NavigationRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName={isAuthenticated ? "RedirectMail" : "Login"}>
        {isAuthenticated ? (
            <>
            <Stack.Screen name="ContactMail" component={ContactMail} options={{ headerShown: false }} />
            <Stack.Screen name="RedirectMail" component={RedirectMail} options={{ headerShown: false }} />
            </>
        ) : (
            <>
                <Stack.Screen name="AnnouncePage" component={AnnouncePage} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
            </>
        )}
        </Stack.Navigator>
    );
  };