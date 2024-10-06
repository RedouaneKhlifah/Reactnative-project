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
import OffreInfo from './OffreInfo';
import OffreRating from './OffreRating';
import {useNavigationRef} from '../../../store/NavigationContext';

export interface IoffreData {
  id: number;
  name: string;
  address: string;
  category: category;
  gallery_images_filenames: string[];
  description: string;
  views: number;
}

interface category {
  id: number;
  name: string;
  image: ImageSourcePropType | undefined;
}

const OffreCard: FC<{data?: IoffreData | null}> = ({data}) => {
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
      <View style={{flex: 1, width: '87%', alignSelf: 'center', gap: 13}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: 12,
          }}>
          <View style={{flex: 1}}>
            <OffreInfo
              title={name}
              location={address}
              iconSize={responsiveWidth(15)}
            />
          </View>
          <OffreRating views={data.views} />
        </View>

        <View style={styles.line}></View>
        <View
          style={{
            flex: 1,
          }}>
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
                height: responsiveHeight(60),
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
