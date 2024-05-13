import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import {responsiveHeight} from '../../utils/responsive';

interface props {
  labelText?: string;
  placeholder: string;
  labelStyle: StyleProp<TextStyle>;
  inputStyle: StyleProp<TextStyle>;
}

const InputWithLabel: React.FC<props> = ({
  labelText,
  placeholder,
  labelStyle,
  inputStyle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{labelText}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={`${placeholder}`}
        placeholderTextColor={COLORS.grayHalfOpacity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...FONTS.body3,
    fontWeight: '400',
    paddingLeft: 3,
    transform: [{translateY: 5}],
  },
  input: {
    fontWeight: '300',
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
    paddingVertical: 0,
    paddingLeft: 3,
  },
});

export default InputWithLabel;
