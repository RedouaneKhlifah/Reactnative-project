import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import SecondaryButton from '../../components/ui/buttons/SecondaryButton';
import RnIcon from '../../components/ui/RnIcon';
import BackButton from '../../components/ui/buttons/BackButton';
import {useNavigationRef} from '../../store/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosConfig from '../../api/axios.config';
import {RootStackParamList} from '../../interfaces/RootStackParamList';

export default function Profile() {
  const navigationRef = useNavigationRef();

  interface ISocialMediaLinks {
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
  }

  interface IUserProfile {
    id: number;
    profile_image_url: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: 'male' | 'female' | 'other';
    social_media_links: ISocialMediaLinks;
    interests: string[];
    status: string | null;
    completed: boolean;
    created_at: string;
    updated_at: string;
  }

  const [data, setData] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClientWithToken = axiosConfig(true); // Initialize axios with token
        const res = await apiClientWithToken.get(`/influencer/get/`);
        if (res.data) {
          setData(res.data);
        } else {
          setData(null);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items = [
    {
      icon: Icons.socialLinks,
      title: 'Détails de profile',
      iconHeight: 13,
      link: 'ProfileScreen' as keyof RootStackParamList,
    },
    // {icon: Icons.share, title: 'Parrainez et gagnez'},
    {icon: Icons.starIcon, title: 'Évaluez nous'},
    {
      icon: Icons.signout,
      title: 'Se déconnecter',
      link: 'Logout',
      colors: 'red',
    },
  ];

  const handlePress = () => {
    console.log('Button pressed!');
  };

  const handleAction = async (action: string | undefined) => {
    if (action === 'Logout') {
      await AsyncStorage.removeItem('data');
      navigationRef.current?.navigate('ContactMail');
    } else {
      const link = action as keyof RootStackParamList;
      navigationRef.current?.navigate(link);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.topSection}
        source={{uri: data?.profile_image_url}}>
        <View style={styles.overlay}>
          <View style={styles.options}>
            <BackButton bgColor="white" />
            <SecondaryButton onPress={handlePress} title="aide" />
          </View>
          <View style={styles.profileOptions}>
            <View style={styles.userCard}>
              <View style={styles.userInfo}>
                <Image
                  source={{uri: data?.profile_image_url}}
                  style={styles.profilePic}
                />
                <View>
                  <Text style={{fontSize: SIZES.radius, fontWeight: '700'}}>
                    {data?.first_name}
                  </Text>
                  <Text style={{fontSize: SIZES.middleRadius}}>
                    {data?.phone}
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
                        style={{width: 24, height: item.iconHeight ?? 24}}
                      />
                      <Text
                        style={{
                          fontFamily: FONTS.body3.fontFamily,
                          fontSize: SIZES.radius,
                          color: item.colors ?? '',
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <RnIcon name="chevron-right" color="black" size={16} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    display: 'flex',
    backgroundColor: COLORS.white,
  },
  topSection: {
    flex: 1,
    justifyContent: 'space-between',
    width: SIZES.width,
    height: SIZES.height * 0.35,
    flexDirection: 'column',
    resizeMode: 'cover',
    gap: 65,
    position: 'relative',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    paddingTop: '10%',
    alignItems: 'center',
  },
  profileOptions: {
    position: 'absolute',
    display: 'flex',
    paddingHorizontal: 10,
    paddingVertical: 27,
    height: '70%',
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
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
    width: 80,
    height: 80,
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
});
