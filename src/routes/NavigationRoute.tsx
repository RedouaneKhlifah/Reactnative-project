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

type ScreenMapItems = {
    name: keyof RootStackParamList;
    component: React.ComponentType<any>;  // Adjust this type based on your actual component type
  };
export const NavigationRoute: React.FC = () => {
    const { isAuthenticated,isConfirmed } = useAuth();
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const unloggedScreens:ScreenMapItems[] = [
        {name:'RoleSelectionScreen',component:RoleSelectionScreen},
        {name:'Login',component:LoginScreen},
        {name:'Signup',component:SignupScreen},
    ]
    return (
    <Stack.Navigator>
        {!isAuthenticated ? (
        <>
        {
            unloggedScreens?.map((screen,index)=>{
                return (
                <Stack.Screen
                    key={index}
                    name={screen.name}
                    component={screen.component}
                    options={{ headerShown: false }}
                />
                )
            })
        }
        </>
        ) : isConfirmed ? (
        <Stack.Screen
            name="ContactMail"
            component={ContactMail}
            options={{ headerShown: false }}
        />
        ) : (
        <Stack.Screen
            name="RedirectMail"
            component={RedirectMail}
            options={{ headerShown: false }}
        />
        )}
    </Stack.Navigator>
    );
};