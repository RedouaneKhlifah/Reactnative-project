import React, {FC} from 'react';
import {Pressable, Text} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {COLORS} from '../../constants';

interface FilterProps {
  Icon: React.FC<SvgProps>;
  title: string;
  onPress: () => void;
  bg?: string;
  textColor?: string;
}

const ActionButton: FC<FilterProps> = ({
  Icon,
  title,
  onPress,
  bg,
  textColor,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.7 : 1},
        {
          borderRadius: 45,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 13,
          paddingVertical: 7,
          flexDirection: 'row',
          borderWidth: 2,
          borderColor: COLORS.black,
          backgroundColor: bg ? bg : COLORS.white,
        },
      ]}
      onPress={onPress} // Call onPress function when pressed
    >
      <Icon />
      <Text
        style={{
          fontSize: 13,
          color: textColor ? textColor : COLORS.black,
          fontWeight: '500',
          marginLeft: 7,
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ActionButton;
