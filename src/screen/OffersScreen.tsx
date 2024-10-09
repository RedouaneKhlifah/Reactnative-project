import {View, Text, ScrollView} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {COLORS, Icons} from '../constants';
import ActionButton from '../components/CategorySection/ActionButton';
import BackButton from '../components/ui/buttons/BackButton';
import {useNavigationRef} from '../store/NavigationContext';
import OffreCardV from '../components/OffresScreenC/OffreCardV';
import {RouteProp} from '@react-navigation/native';
import axiosConfig from '../api/axios.config';
import {IoffreData} from '../components/Home/BottomSection/OffreCard';
import {RootStackParamList} from '../interfaces/RootStackParamList';
import { InfluencerData } from '../interfaces/User';

type OffersScreenProp = RouteProp<RootStackParamList, 'OffersScreen'>;

const OffersScreen: FC<{route: OffersScreenProp}> = ({route}) => {
  const {categoryId, name} = route.params;
  const navigationRef = useNavigationRef();

  const [data, setData] = useState<IoffreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [Order, setOrder] = useState<string>('asc');


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiClientWithToken = axiosConfig(true);
        const res = await apiClientWithToken.get(
          `/influencer/get-category-businesses/${categoryId}/${Order}`,
        );


        if (res.data.businesses) {
          setData(res.data.businesses);
        } else {
          setData([]);
        }
        setLoading(false);
      } catch (err) {        
        setLoading(true);
      }
    };

    fetchData();
  }, [Order]);

  return (
    <ScrollView style={{paddingTop: 10, backgroundColor: COLORS.white}}>
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
        <Text style={{fontSize: 19, textAlignVertical : 'center'  , fontWeight: '400', color: COLORS.black}}>
          {name}
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
        <ActionButton
          Icon={Order === 'asc' ? Icons.trier : Icons.trierWhite}
          title="Trier"
          textColor={Order === 'asc' ? COLORS.black : COLORS.white}
          bg={Order === 'asc' ? COLORS.white : COLORS.black}
          onPress={() => setOrder(Order === 'asc' ? 'desc' : 'asc')}
        />
      </View>
      <View
        style={{
          width: '87%',
          alignSelf: 'center',
          paddingBottom: 10,
        }}>
        <Text style={{color: COLORS.black, fontSize: 16, fontWeight: '400'}}>
          Affichage de {data.length} propriétés
        </Text>
      </View>
      <View style={{alignItems: 'center', gap: 20}}>
        <OffreCardV data={data} loading={loading} error={error} />
      </View>
    </ScrollView>
  );
};

export default OffersScreen;
