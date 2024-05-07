import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { SIZES ,COLORS, FONTS} from '../../constants'; // Assuming you have a constant file with SIZES defined

const Input = () => {
  return (
      <TextInput style={styles.input} placeholder="Numéro de téléphone"  placeholderTextColor={COLORS.grayHalfOpacity} />

  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: SIZES.middleRadius, 
    paddingHorizontal :10,
    height:"100%",
    flex : 1,
    ...FONTS.body3,
    fontSize: 16,
    fontWeight : "400",
  },
});

export default Input;
