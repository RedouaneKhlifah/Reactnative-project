import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import OfferImages from './OfferImages';
import {COLORS, Icons, Images} from '../../../constants';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import SocialMediaLinks from './SocialMediaLinks';
import OffreInfo from './OffreInfo';
import LineBetween from './LineBetween';
import OffreRating from './OffreRating';

export interface IoffreImagesData {
  id: number;
  image: ImageSourcePropType | undefined;
}

export const offreImagesData: IoffreImagesData[] = [
  {
    id: 1,
    image: Images.testImage,
  },
  {
    id: 2,
    image: Images.testImage,
  },
  {
    id: 3,
    image: Images.testImage,
  },
];

export interface IoffreData {
  title: string;
  location: string;
  rating: number;
  type: string;
}

export interface IoffreCard {
  id: number;
  offreImages: IoffreImagesData[];
  offreData: IoffreData;
}

interface IoffreCardData {
  data: IoffreCard;
}

const OffreCard: FC<IoffreCardData> = ({data}) => {
  const {offreImages, offreData} = data;
  const {title, location, rating, type} = offreData;

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <OfferImages data={offreImages} />
      </View>
      <View style={{flex: 1, width: '82%', alignSelf: 'center', gap: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <OffreInfo
            title={'Sambara'}
            location={'Tetouan, MA'}
            iconSize={responsiveWidth(18)}
          />
          <OffreRating rating={4.5} />
        </View>

        <View style={styles.line}></View>
        <View style={styles.socialMediaLinksConatiner}>
          <View style={styles.socialMediaLinksInnerConatiner}>
            <SocialMediaLinks icon={Icons.facbookLink} size={25} />
            <SocialMediaLinks icon={Icons.instagramLink} size={25} />
            <SocialMediaLinks icon={Icons.gougleMap} size={25} />
            <SocialMediaLinks icon={Icons.Tiktok} size={25} />
          </View>
          <View style={styles.offreType}>
            <Text
              style={{
                color: 'rgba(241, 59, 58, 0.80)',
                fontSize: responsiveWidth(11),
                fontWeight: '600',
              }}>
              Snack
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 6,
          }}>
          <View style={{flexDirection: 'row', gap: 6}}>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.8 : 1},
                {
                  padding: 11,
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  borderRadius: 11,
                },
              ]}>
              <Image
                source={Icons.mail}
                style={{
                  width: responsiveWidth(19),
                  height: responsiveHeight(25),
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.8 : 1},
                {
                  padding: 11,
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  borderRadius: 11,
                },
              ]}>
              <Image
                source={Icons.save}
                style={{
                  width: responsiveWidth(17),
                  height: responsiveHeight(25),
                }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <Pressable
            style={({pressed}) => [
              {opacity: pressed ? 0.8 : 1},
              {
                flex: 1,
                backgroundColor: '#D3F36A',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
              },
            ]}>
            <Text
              style={{
                fontSize: responsiveWidth(13),
                color: 'rgba(0, 0, 0, 0.80)',
                fontWeight: '500',
              }}>
              Envoyer un message
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 24,
    padding: responsiveWidth(13),
    gap: 15,
    flex: 1,
  },
  imagesContainer: {
    width: responsiveWidth(298),
    borderRadius: 12,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  title: {
    fontSize: responsiveWidth(21),
    fontWeight: '400',
    paddingLeft: 11,
    color: COLORS.black,
  },
  location: {
    fontSize: responsiveWidth(13),
    fontWeight: '300',
    paddingLeft: 11,
    transform: [{translateY: -3}],
  },
  rating: {
    width: responsiveWidth(87.73),
    height: responsiveHeight(35.58),
    backgroundColor: COLORS.lightOrnange,
    borderRadius: 20.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    color: COLORS.orange,
    fontSize: responsiveWidth(21),
    fontWeight: '900',
    fontFamily: 'Holly Groove',
  },
  line: {
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
  },
  socialMediaLinksConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialMediaLinksInnerConatiner: {
    flexDirection: 'row',
    gap: 6,
  },
  offreType: {
    backgroundColor: '#FEEEEE',
    borderRadius: 20.5,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    justifyContent: 'center',
  },
});

export default OffreCard;
