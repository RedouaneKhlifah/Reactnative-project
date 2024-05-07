import { View, StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { COLORS, FONTS, Icons, SIZES } from '../../constants';

const NavbarHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1 },
        ]}>
          <Icons.backArrow />
        </Pressable>
        <Pressable style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1 } , styles.textConatiner] }>
          <Text style={styles.text}>Passer</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height :"29%"
  },
  textConatiner  :{
  backgroundColor: COLORS.white,
  justifyContent: "center",
    height : "100%",
    borderRadius: SIZES.fullRadius,
  
  },
  text: {
    color: COLORS.black,
    paddingHorizontal: 18,
    ...FONTS.h3,
  },
});

export default NavbarHeader;
