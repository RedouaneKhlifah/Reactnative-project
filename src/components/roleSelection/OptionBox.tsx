import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { appTheme } from '../../constants';
import { Images } from '../../constants';

const { COLORS, FONTS, SIZES } = appTheme;

const OptionBox = () => {
  return (
    <Pressable
      style={({ pressed }) => [
        style.container,
        { opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <View style={style.imageContainer}>
        <Image 
          style={style.image} 
          source={Images.influencer} 
          resizeMode="cover" // Set resizeMode to contain
        />
      </View>
      <View style={style.textContainer}>
        <Text style={{ ...FONTS.h2 ,color : COLORS.black }}>Influencer</Text>
        <Text style={{ ...FONTS.h4,color : COLORS.black }}>Obtenez des collaborations Win Win</Text>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.yellow,
    flex : 1,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    padding : 10,
    gap : 8
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: SIZES.smallRadius,
    overflow: 'hidden',
    width: '100%',
    paddingBottom : 10,
    flex : 4,
  },
  image: {
    width: '100%',
    borderRadius: SIZES.smallRadius,
    overflow: 'hidden',
  },
  textContainer: {
    flex : 1,
    width: '100%',
    justifyContent : "center"
  },
});

export default OptionBox;
