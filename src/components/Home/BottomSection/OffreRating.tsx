import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import {COLORS, Icons} from '../../../constants';

const OffreRating: FC<{views: number}> = ({views}) => {
  return (
    <View style={styles.rating}>
      <Image
        style={{width: responsiveWidth(15), height: responsiveHeight(15)}}
        source={Icons.eye}
      />
      <Text style={styles.ratingText}>{views}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    width: responsiveWidth(80),
    height: responsiveHeight(40),
    backgroundColor: COLORS.lightOrnange,
    borderRadius: 20.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    color: COLORS.orange,
    fontSize: responsiveWidth(15),
    fontWeight: '900',
    fontFamily: 'Holly Groove',
  },
});

export default OffreRating;
