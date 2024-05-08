import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import React, {FC} from 'react';
import OfferImages from './OfferImages';
import {COLORS, Icons, Images} from '../../../constants';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import SocialMediaLinks from './SocialMediaLinks';

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
    image: Images.offreImage,
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
  console.log(data);

  const {offreImages, offreData} = data;
  const {title, location, rating, type} = offreData;

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <OfferImages data={offreImages} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Icons.verify />
          </View>
          <View>
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={styles.rating}>
          <Icons.star />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.line}></View>

      <View style={styles.socialMediaLinksConatiner}>
        <View style={styles.socialMediaLinksInnerConatiner}>
          <SocialMediaLinks Icon={Icons.facbookLink} />
          <SocialMediaLinks Icon={Icons.instagramLink} />
          <SocialMediaLinks Icon={Icons.gougleMap} />
          <SocialMediaLinks Icon={Icons.TikTok} />
        </View>
        <View style={styles.offreType}>
          <Text
            style={{
              color: 'rgba(241, 59, 58, 0.80)',
              fontSize: 11,
              fontWeight: '600',
            }}>
            {type}
          </Text>
        </View>
      </View>

      <View style={{flex: 1, width: '100%', flexDirection: 'row', gap: 6}}>
        <View style={{flexDirection: 'row', gap: 6}}>
          <View
            style={{
              padding: 11,
              borderWidth: 1,
              borderColor: '#EBEBEB',
              borderRadius: 11,
            }}>
            <Icons.offreMail />
          </View>
          <View
            style={{
              padding: 11,
              borderWidth: 1,
              borderColor: '#EBEBEB',
              borderRadius: 11,
            }}>
            <Icons.offreMail />
          </View>
        </View>
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.8 : 1},
            {
              width: '55%',
              backgroundColor: '#D3F36A',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            },
          ]}>
          <Text
            style={{
              fontSize: 13,
              color: 'rgba(0, 0, 0, 0.80)',
              fontWeight: '500',
            }}>
            Envoyer un message
          </Text>
        </Pressable>
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
    borderRadius: 24,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  title: {
    fontSize: 21,
    fontWeight: '400',
    paddingLeft: 11,
    color: COLORS.black,
  },
  location: {
    fontSize: 13,
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
    fontSize: 21,
    fontWeight: '900',
    fontFamily: 'Holly Groove',
  },
  line: {
    borderBottomWidth: 1,
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
    width: responsiveWidth(65),
    height: responsiveHeight(24),
    justifyContent: 'center',
  },
});

export default OffreCard;
