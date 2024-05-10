import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import {COLORS, Icons, Images} from '../../../constants';
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
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
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
        <Text style={[styles.location, locationStyle]}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: responsiveWidth(21),
    fontWeight: '400',
    color: COLORS.black,
    lineHeight: 22,
  },
  location: {
    fontSize: responsiveWidth(13),
    fontWeight: '300',
    transform: [{translateY: 4}],
    lineHeight: 12,
  },
});

export default OffreInfo;
