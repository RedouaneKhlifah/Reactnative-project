import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, Icons, SIZES} from '../../constants';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, !isFocused && {alignItems: 'center'}]}>
      {!isFocused && <Icons.search style={styles.icon} />}

      <TextInput
        style={styles.input}
        placeholder="Cherche ici"
        placeholderTextColor={COLORS.white}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: SIZES.fullRadius,
    borderColor: COLORS.white,
    height: 40,
    width: '70%',
    paddingTop: 5,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    left: ' 29%',
    top: '68%',
    transform: [{translateY: -10}], // Center the icon vertically
    color: COLORS.white,
  },
  input: {
    color: COLORS.white,
    paddingLeft: 27, // Adjust the left padding to accommodate the icon
    ...FONTS.body3,
    fontSize: 16,
    fontWeight: '400',
    height: 50,
  },
});

export default SearchInput;
