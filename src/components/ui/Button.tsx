import React, {FC} from 'react';
import {Pressable, StyleProp, Text, TextStyle} from 'react-native';
import {COLORS} from '../../constants';

interface ButtonProps {
  buttonStyle: StyleProp<TextStyle>;
  titleStyle: StyleProp<TextStyle>;
  title: string;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({buttonStyle, titleStyle, title, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.7 : 1},
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 0,
        },
        buttonStyle,
      ]}
      onPress={onPress}>
      <Text style={titleStyle}>{title}</Text>
    </Pressable>
  );
};

export default Button;

// paddingHorizontal: 13,
// paddingVertical: 7,

// {
//     fontSize: 13,
//     color: COLORS.black,
//     fontWeight: '500',
//     marginLeft: 7,
//   }
