import {
  View,
  ImageBackground,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../constants';
import {useAuth} from '../../../store/AuthContext';
import {useNavigationRef} from '../../../store/NavigationContext';
import { InfluencerData } from '../../../interfaces/User';

const HeaderSkeleton = () => {
  return (
    <View style={styles.Header}>
      <View style={styles.skeletonProfileImage} />
    </View>
  );
};

const Header = ({ influencerData, loading }: { influencerData: InfluencerData | null; loading: boolean }) => {
  const { userData } = useAuth();
  const navigationRef = useNavigationRef();

  const NavigateProfile = () => {
    if (!userData) {
      navigationRef.current?.navigate('Login');
    }
    if (userData?.role === 'influencer') {
      navigationRef.current?.navigate('Profile', { id: userData.user_id });
    } else if (userData?.role === 'business') {
      navigationRef.current?.navigate('BusinessProfile', {
        id: userData.user_id,
      });
    }
  };

  return (
    <View style={styles.Header}>
      {loading ? (
        <HeaderSkeleton />
      ) : (
        <Pressable onPress={NavigateProfile}>
          <ImageBackground
            source={{ uri: influencerData?.profile_image_url }}
            style={styles.profileImage }
            imageStyle={{
              resizeMode: 'cover',
            }}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    marginTop: SIZES.height * 0.03,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    height: 37,
    width: 37,
    borderRadius: 100,
    marginLeft: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  skeletonProfileImage: {
    height: 37,
    width: 37,
    borderRadius: 100,
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
  },
  skeletonText: {
    height: 20,
    width: '60%',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default Header;
