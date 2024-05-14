import React from 'react';
import { View, Text, TextInput, StyleSheet, StyleProp, TextStyle, TextInputProps } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { responsiveHeight } from '../../utils/responsive';

interface Props extends TextInputProps {
  labelText?: string;
  placeholder: string;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  numberOfLines?: number;

}

const InputWithLabel: React.FC<Props> = ({
  labelText,
  placeholder,
  labelStyle,
  inputStyle,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 4, // Adjust this as needed
  ...props
}) => {
  return (
    <View style={styles.container}>
      {
        labelText &&
        <Text style={[styles.label, labelStyle]}>{labelText}</Text>
      }
      <TextInput
        style={[styles.input, inputStyle, multiline && styles.textArea]}
        placeholder={`${placeholder}`}
        placeholderTextColor={COLORS.grayHalfOpacity}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
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
    transform: [{translateY: 15}],
  },
  input: {
    fontWeight: '300',
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
    paddingVertical: 0,
    paddingLeft: 3,
  },
  textArea: {
    paddingTop:responsiveHeight(25),
    height: responsiveHeight(150), // Adjust this as needed
    textAlignVertical: 'top', // Start input from top
  },
});

export default InputWithLabel;
