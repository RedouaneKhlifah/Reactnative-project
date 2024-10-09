import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import SecondaryButton from '../../components/ui/buttons/SecondaryButton';
import RnIcon from '../../components/ui/RnIcon';
import BackButton from '../../components/ui/buttons/BackButton';
import {responsiveWidth} from '../../utils/responsive';
import {useNavigationRef} from '../../store/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../interfaces/RootStackParamList';
import axiosConfig from '../../api/axios.config';
import {BusinessData} from '../../interfaces/User';
import {useAuth} from '../../store/AuthContext';
import { BackHandler, Alert } from 'react-native';


interface NavigationItem {
  icon: ImageSourcePropType; // Assuming Icons is an imported library providing icon components
  title: string;
  link?: string; // Optional property if navigation link is needed
  color?: string; // Optional property for specifying color
}


const BusinessProfile = () => {
  const navigationRef = useNavigationRef();
  const apiClientWithToken = axiosConfig(true); // Initialize axios with token
  const [data, setData] = useState<BusinessData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const {userData} = useAuth();

  // OUT OFF THE APP 

  useEffect(() => {
    // Function to handle back button press
    const backAction = () => {
      Alert.alert("Exit App", "Do you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

   return () => backHandler.remove();
  }, []);
  


  const items: NavigationItem[] = [
    {
      icon: Icons.location,
      title: "Détails de l'entreprise",
      link: 'BusinessDetails' as keyof RootStackParamList,
    },
    {icon: Icons.starIcon, title: 'Évaluez nous'},
    {
      icon: Icons.signout,
      title: 'Se déconnecter',
      link: 'Logout',
      color: '#DC3545',
    },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClientWithToken.get(`/business/get/`);
        console.log(res.data);
        if (res.data) {
          setData(res.data);
        } else {
          setData(null);
        }
      } catch (err) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (action: string | undefined) => {
    if (action === 'Logout') {
      await AsyncStorage.removeItem('data');
      navigationRef.current?.navigate('ContactMail');
    } else {
      const link = action as keyof RootStackParamList;
      navigationRef.current?.navigate(link);
    }
  };

  const handlePress = () => {
    // Your onPress logic here
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!data) {
    const Logout = async () => {
      await AsyncStorage.removeItem('data');
      navigationRef.current?.navigate('ContactMail');
    };
    Logout();
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Failed to load business data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.topSection} source={Images.homeBackground}>
        <View style={styles.overlay}>
          <View style={styles.options}>
            <Text style={styles.title}>{data?.name}</Text>
            <SecondaryButton
              onPress={handlePress}
              title="Aide"
              buttonStyle={{elevation: 0}}
              textStyle={{fontSize: 12}}
            />
          </View>
          <View style={styles.profileOptions}>
            <View style={styles.userCard}>
              <View style={styles.userInfo}>
                <Image
                  source={{
                    uri:
                      data?.gallery_image_urls && data?.gallery_image_urls[0],
                  }}
                  style={styles.profilePic}
                />
                <View>
                  <Text
                    style={{
                      fontSize: SIZES.body3,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {data?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.middleRadius,
                      color: 'black',
                      opacity: 0.7,
                    }}>
                    {data?.category.name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.linksHolder}>
              {items.map((item, index) => {
                return (
                  <Pressable
                    style={styles.link}
                    key={index}
                    onPress={() => handleAction(item.link)}>
                    <View style={styles.userInfo}>
                      <Image
                        source={item.icon}
                        style={{width: 17, height: 17}}
                      />
                      <Text
                        style={{
                          fontFamily: FONTS.body4.fontFamily,
                          fontSize: 14,
                          color: item.color || '',
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <RnIcon name="chevron-right" color="black" size={14} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    display: 'flex',
  },
  topSection: {
    flex: 1,
    justifyContent: 'space-between',
    width: SIZES.width,
    height: SIZES.height * 0.35,
    flexDirection: 'column',
    resizeMode: 'cover', // or 'stretch' or 'contain'
    position: 'relative',
  },
  overlay: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: '10%',
    paddingTop: '10%',
    alignItems: 'center',
  },
  profileOptions: {
    position: 'absolute',
    display: 'flex',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: 27,
    height: SIZES.height * 0.8,
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.05,
    shadowRadius: 17,
    elevation: 6,
  },
  userCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 1000,
  },
  linksHolder: {
    display: 'flex',
    paddingHorizontal: 10,
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: '110%', // Position the text 50% from the top of its container
    left: 0,
    right: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default BusinessProfile;
