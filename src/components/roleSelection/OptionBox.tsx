import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {appTheme} from '../../constants';
import {Images} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import {useNavigationRef} from '../../store/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {COLORS, FONTS, SIZES} = appTheme;
type boxProps = {
  id: string;
  title: string;
  action: string;
  urlPic: string;
  link: keyof RootStackParamList;
};

const OptionBox: React.FC<boxProps> = ({title, action, link}) => {
  const navigationRef = useNavigationRef();
  const handleNavigation = () => {
    if (title === 'Influencer') {
      AsyncStorage.setItem('registerUrl', '/register-influencer-user');
    } else {
      AsyncStorage.setItem('registerUrl', '/register-business-user');
    }

    navigationRef.current?.navigate(link);
  };
  return (
    <Pressable
      style={({pressed}) => [style.container, {opacity: pressed ? 0.8 : 1}]}
      onPress={() => handleNavigation()}>
      <Image style={style.image} source={Images.testImage} resizeMode="cover" />
      <View style={style.textContainer}>
        <Text style={{...FONTS.h2, color: COLORS.black}}>{title}</Text>
        <Text style={{...FONTS.h4, color: COLORS.black}}>{action}</Text>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.yellow,
    height: responsiveHeight(309),
    width: responsiveWidth(331),
    borderRadius: SIZES.radius,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    gap: 8,
  },
  image: {
    borderRadius: SIZES.smallRadius,
    overflow: 'hidden',
    height: responsiveHeight(212),
    width: responsiveWidth(301),
  },
  textContainer: {
    width: responsiveWidth(301),
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default OptionBox;
