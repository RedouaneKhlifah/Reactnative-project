import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import {COLORS, Icons} from '../../../constants';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';

interface OffreInfoProp {
  title: string;
  location: string;
  titleStyle?: StyleProp<TextStyle>;
  locationStyle?: StyleProp<TextStyle>;
  iconSize: number;
}

const OffreInfo: FC<OffreInfoProp> = ({
  title,
  location,
  titleStyle,
  locationStyle,
  iconSize,
}) => {

  return (

    
    <View>
      <View style={[styles.titleContainer]}>
        <Text
          style={[styles.title, titleStyle]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
        <Image
          source={Icons.verify}
          style={{
            width: iconSize,
            height: iconSize,
          }}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text
          style={[styles.location, locationStyle]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {location}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  title: {
    fontSize: responsiveWidth(16),
    fontWeight: '400',
    color: COLORS.black,
    lineHeight: 22,
    maxWidth: 160
    // Set a maxWidth to ensure ellipsis
  },
  location: {
    fontSize: responsiveWidth(11),
    fontWeight: '300',
    transform: [{translateY: 4}],
    lineHeight: 12,
    maxWidth: responsiveWidth(160),
  },
});

export default OffreInfo;
