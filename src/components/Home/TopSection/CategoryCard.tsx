import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, Images} from '../../../constants';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import {CategoryCardT} from '../../../interfaces/bestOfferCardT';
import {useNavigationRef} from '../../../store/NavigationContext';

const CategoryCard: FC<{categoryData: CategoryCardT}> = ({categoryData}) => {
  const {image, name, id} = categoryData;
  const navigationRef = useNavigationRef();

  const handlePress = () => {
    navigationRef.current?.navigate('OffersScreen', {categoryId: id});
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) => [styles.card, {opacity: pressed ? 0.8 : 1}]}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={image || Images.testImage}>
        <Text style={styles.CardText}>{name}</Text>
      </ImageBackground>
    </Pressable>
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

export default CategoryCard;
