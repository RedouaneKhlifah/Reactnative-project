import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {COLORS, Icons, Images, SIZES} from '../constants';
import SelectedOffreImages from '../components/AnnouncePage/TopSection.tsx/SelectedOffreImages';
import OffreInfo from '../components/Home/BottomSection/OffreInfo';
import LineBetween from '../components/Home/BottomSection/LineBetween';
import SocialMediaLinks from '../components/Home/BottomSection/SocialMediaLinks';
import OffreRating from '../components/Home/BottomSection/OffreRating';
import SimilairesOffre from '../components/AnnouncePage/buttomSection/SimilairesOffre';
import DateInputWithLbel from '../components/ui/DateInputWithLbel';
import InputWithLabel from '../components/ui/InputWithLabel';
import {responsiveWidth} from '../utils/responsive';
import SecondaryButton from '../components/ui/buttons/SecondaryButton';
import {RouteProp} from '@react-navigation/native';
import axiosConfig from '../api/axios.config';
import {IoffreData} from '../components/Home/BottomSection/OffreCard';
import {useNavigationRef} from '../store/NavigationContext';
import SkeletonAnnouncePage from '../skelton/SkeletonAnnouncePage';

export const offreImagesData = [
  {
    id: 1,
    image: Images.selctedImage,
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

type OffersScreenProp = RouteProp<RootStackParamList, 'AnnouncePage'>;

const AnnouncePage: FC<{route: OffersScreenProp}> = ({route}) => {
  const {id} = route.params;

  const [data, setData] = useState<IoffreData | null>(null);
  const [suggestedBusinesses, setSuggestedBusinesses] = useState<
    IoffreData[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiClientWithToken = axiosConfig(true);
        const res = await apiClientWithToken.get(
          `/influencer/get-business/${id}`,
        );

        if (res.data.business) {
          setData(res.data.business);
          setSuggestedBusinesses(res.data.suggested_businesses);
        } else {
          setData(null);
          setSuggestedBusinesses(null);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        setData(null);
        setSuggestedBusinesses(null);
      }
    };
    fetchData();

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  }, [id]);

  const handleSubmit = () => {};

  if (loading) {
    return <SkeletonAnnouncePage />;
  }

  if (!data) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  const navigationRef = useNavigationRef();

  return (
    <ScrollView ref={scrollViewRef} style={{backgroundColor: COLORS.white}}>
      <View style={{marginBottom: 22}}>
        <SelectedOffreImages data={data.gallery_images_filenames} />
        <Pressable
          onPress={() =>
            navigationRef.current?.navigate('OffersScreen', {
              categoryId: data.category.id,
              name: data.category.name,
            })
          }
          style={({pressed}) => [
            {opacity: pressed ? 0.8 : 1},
            {position: 'absolute', top: 20, left: 15},
          ]}>
          <Icons.backArrow2 />
        </Pressable>
      </View>
      <View style={{gap: 22, backgroundColor: COLORS.white}}>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <OffreInfo
              title={data.name}
              location={data.address}
              iconSize={18}
            />
            <OffreRating views={data.views} />
          </View>
        </View>
        <LineBetween lineStyle={{borderWidth: 1}} />
        <View style={{width: '90%', alignSelf: 'center', gap: 15}}>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: '400', color: COLORS.black}}>
              Description:
            </Text>
            <Text style={{fontSize: 14, fontWeight: '300', lineHeight: 22}}>
              {data.description}
            </Text>
          </View>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: '400', color: COLORS.black}}>
              Formulaire:
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: SIZES.width * 0.4}}>
                <DateInputWithLbel placeholder="Date" mode="date" />
              </View>
              <View style={{width: SIZES.width * 0.4}}>
                <DateInputWithLbel placeholder="Heure" mode="time" />
              </View>
            </View>
            <InputWithLabel
              placeholder="Nombre de personnes"
              labelStyle={{
                fontSize: responsiveWidth(13),
                color: COLORS.darkGray,
              }}
              inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
              keyboardType="numeric"
            />
            <InputWithLabel
              labelText="Message"
              multiline={true}
              numberOfLines={10}
              placeholder="Ecrivez votre message ici …"
              labelStyle={{
                fontSize: responsiveWidth(13),
                color: COLORS.darkGray,
              }}
              inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
            />
            <SecondaryButton
              title="Envoyer"
              onPress={handleSubmit}
              buttonStyle={{backgroundColor: '#AB82FF', marginVertical: 15}}
              textStyle={{color: 'white'}}
            />
          </View>

          <View>
            <Text
              style={{fontSize: 20, fontWeight: '400', color: COLORS.black}}>
              Autres businesses similaires
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              rowGap: 10,
            }}>
            {suggestedBusinesses?.map((item, index) => (
              <SimilairesOffre key={index} data={item} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnnouncePage;
