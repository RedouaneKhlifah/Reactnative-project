import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import OffreCard, {
  offreImagesData,
} from '../components/Home/BottomSection/OffreCard';
import {COLORS, Icons, FONTS} from '../constants';
import ActionButton from '../components/CategorySection/ActionButton';

export const dummyData = {
  title: 'Example Title',
  location: 'Example Location',
  rating: 4.5,
  type: 'Example Type',
};

const data = {
  id: 1,
  offreImages: offreImagesData,
  offreData: dummyData,
};

const CategorySection = () => {
  return (
    <ScrollView style={{marginTop: 10, backgroundColor: '#FFF'}}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          gap: 10,
        }}>
        <Pressable style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}>
          <Icons.backArrow2 />
        </Pressable>
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
        <OffreCard data={data} />
        <OffreCard data={data} />
        <OffreCard data={data} />
        <OffreCard data={data} />
        <OffreCard data={data} />
        <OffreCard data={data} />
        <OffreCard data={data} />
      </View>
    </ScrollView>
  );
};

export default CategorySection;
