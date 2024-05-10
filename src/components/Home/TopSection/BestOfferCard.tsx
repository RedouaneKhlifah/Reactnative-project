import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, Images, SIZES} from '../../../constants';
import {bestOfferCardT} from '../../../interfaces/bestOfferCardT';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';

const BestOfferCard: FC<{OffreData: bestOfferCardT}> = ({OffreData}) => {
  const {image, title} = OffreData;
  console.log(SIZES.width);
  return (
    <View style={styles.card}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={Images.testImage}>
        <Text style={styles.CardText}>{title}</Text>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: responsiveHeight(210),
    width: responsiveWidth(246),
    borderRadius: 15,
    overflow: 'hidden',
  },
  CardText: {
    ...FONTS.body2,
    fontSize: responsiveWidth(20),
    color: COLORS.black,
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    marginTop: '10%',
    paddingHorizontal: 13,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default BestOfferCard;
