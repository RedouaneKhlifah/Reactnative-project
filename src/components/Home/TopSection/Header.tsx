import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import SearchInput from '../../ui/SearchInput';
import {Icons, Images, SIZES} from '../../../constants';
import {useAuth} from '../../../store/AuthContext';
import {useNavigationRef} from '../../../store/NavigationContext';

const Header = () => {
  const {userData} = useAuth();
  const navigationRef = useNavigationRef();

  const NavigateProfile = () => {
    if (!userData) {
      navigationRef.current?.navigate('Login');
    }
    if (userData?.role === 'influencer') {
      navigationRef.current?.navigate('Profile', {id: userData.user_id});
    } else if (userData?.role === 'business') {
      navigationRef.current?.navigate('BusinessProfile', {
        id: userData.user_id,
      });
    }
  };
  return (
    <View style={styles.Header}>
      <Pressable onPress={NavigateProfile}>
        <ImageBackground
          source={Images.Union}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 38,
            width: 38,
          }}>
          <Image source={Icons.profile}></Image>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    marginTop: SIZES.height * 0.03,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
});

export default Header;
