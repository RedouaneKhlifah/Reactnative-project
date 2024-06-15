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
import OffreRating from './OffreRating';
import {useNavigationRef} from '../../../store/NavigationContext';

export interface IoffreData extends suggested_businessesI {
  id: number;
  name: string;
  address: string;
  category: category;
  description: string;
}

interface suggested_businessesI {
  suggested_businesses?: IoffreData[];
}

interface category {
  id: number;
  name: string;
  image: ImageSourcePropType | undefined;
}

const OffreCard: FC<{data?: IoffreData}> = ({data}) => {
  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  const {id, gallery_images_filenames, name, address, category} = data;

  const navigationRef = useNavigationRef();

  const handlePress = () => {
    navigationRef.current?.navigate('AnnouncePage', {id: id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <OfferImages data={gallery_images_filenames} />
      </View>
      <View style={{flex: 1, width: '82%', alignSelf: 'center', gap: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <OffreInfo
            title={name}
            location={address}
            iconSize={responsiveWidth(15)}
          />
          <OffreRating rating={4.5} />
        </View>

        <View style={styles.line}></View>
        <View style={styles.socialMediaLinksContainer}>
          <View style={styles.socialMediaLinksInnerContainer}>
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
              {category?.name}
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
            onPress={handlePress}
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
    marginBottom: 20,
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
  socialMediaLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialMediaLinksInnerContainer: {
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
  noDataText: {
    fontSize: responsiveWidth(16),
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: responsiveHeight(20),
  },
});

export default OffreCard;
