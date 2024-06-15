import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import {COLORS, Icons} from '../../../constants';

const OffreRating: FC<{rating: number}> = ({rating}) => {
  return (
    <View style={styles.rating}>
      {/* <Icons.star /> */}
      <Text style={styles.ratingText}>{rating}</Text>
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
