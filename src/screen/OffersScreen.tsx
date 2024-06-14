import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import OffreCard, {
  IoffreCard,
  offreImagesData,
} from '../components/Home/BottomSection/OffreCard';
import {COLORS, Icons, FONTS} from '../constants';
import ActionButton from '../components/CategorySection/ActionButton';
import BackButton from '../components/ui/buttons/BackButton';
import {useNavigationRef} from '../store/NavigationContext';
import OffreCardV from '../components/OffresScreenC/OffreCardV';
import {RouteProp, useNavigation} from '@react-navigation/native';
import axiosConfig from '../api/axios.config';

export const dummyData = {
  title: 'Example Title',
  location: 'Example Location',
  rating: 4.5,
  type: 'Example Type',
};

const data = [
  {
    id: 1,
    offreImages: offreImagesData,
    offreData: dummyData,
  },
  {
    id: 2,
    offreImages: offreImagesData,
    offreData: dummyData,
  },
];

type OffersScreenProp = RouteProp<RootStackParamList, 'OffersScreen'>;

const OffersScreen: FC<{route: OffersScreenProp}> = ({route}) => {
  const {categoryId} = route.params;
  const navigationRef = useNavigationRef();

  const [data, setData] = useState<IoffreCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClientWithToken = axiosConfig(true); // Initialize axios with token
        const res = await apiClientWithToken.get(
          `/influencer/get-category-businesses/${categoryId}/asc`,
        );

        setData(res.data.businesses);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{marginTop: 10, backgroundColor: '#FFF'}}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          gap: 10,
        }}>
        <BackButton
          onPress={() => navigationRef.current?.navigate('Home')}
          bgColor={COLORS.yellow}
          color={COLORS.white}
        />
        <Text style={{fontSize: 22, fontWeight: '400', color: COLORS.black}}>
          Restaurant
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          paddingVertical: 20,
          flexDirection: 'row',
          gap: 6,
        }}>
        <ActionButton Icon={Icons.trier} title="Trier" onPress={() => {}} />
        <ActionButton Icon={Icons.filter} title="Filter" onPress={() => {}} />
      </View>
      <View
        style={{
          width: '87%',
          alignSelf: 'center',
          paddingBottom: 10,
        }}>
        <Text style={{color: COLORS.black, fontSize: 22, fontWeight: '400'}}>
          Affichage de 40 propriétés
        </Text>
      </View>
      <View style={{alignItems: 'center', gap: 20}}>
        <OffreCardV data={data} />
      </View>
    </ScrollView>
  );
};

export default OffersScreen;
