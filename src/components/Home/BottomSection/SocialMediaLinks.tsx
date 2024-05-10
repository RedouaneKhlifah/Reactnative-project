import {View, Text, Pressable, Image, ImageSourcePropType} from 'react-native';
import React, {Children, FC} from 'react';
import {COLORS, Icons, Images} from '../../../constants';
import {responsiveWidth} from '../../../utils/responsive';

const SocialMediaLinks: FC<{icon: ImageSourcePropType; size: number}> = ({
  icon,
  size,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.8 : 1},
        {backgroundColor: COLORS.LightGray2, padding: 3, borderRadius: 5},
      ]}>
      <View>
        <Image
          source={icon}
          style={{width: responsiveWidth(size), height: responsiveWidth(size)}}
        />
      </View>
    </Pressable>
  );
};

export default SocialMediaLinks;
