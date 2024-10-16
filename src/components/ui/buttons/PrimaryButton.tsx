import React from 'react';
import { StyleSheet, TouchableOpacity, Text ,ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants'

const PrimaryButton: React.FC<ButtonProps> = ({ onPress, title, buttonStyle, textStyle, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={textStyle? textStyle.color : "black"} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PrimaryButton;
