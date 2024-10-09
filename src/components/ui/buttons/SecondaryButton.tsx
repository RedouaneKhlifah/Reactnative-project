import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const SecondaryButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: SIZES.font,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SecondaryButton;
