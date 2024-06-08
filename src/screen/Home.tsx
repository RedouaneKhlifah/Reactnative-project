import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS, Images, SIZES} from '../constants';
import Input from '../components/ui/Input';
import SearchInput from '../components/ui/SearchInput';
import Header from '../components/Home/TopSection/Header';
import BestOfferSection from '../components/Home/TopSection/BestOfferSection';
import OffreCard, {
  offreImagesData,
} from '../components/Home/BottomSection/OffreCard';
import {responsiveWidth} from '../utils/responsive';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from '../store/AuthContext';

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

const Home: React.FC = () => {

  return (
    <ScrollView style={{marginBottom: 20}}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.topSection}
          source={Images.homeBackground2}>
          <View style={styles.HeaderContainer}>
            <Header />
          </View>

          <View style={styles.BestOfferSection}>
            <BestOfferSection />
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <View style={{width: '75%'}}>
          <Text style={{fontSize: 22, color: COLORS.black, fontWeight: '400'}}>
            Tu pourrais aimer!
          </Text>
          <Text style={{fontSize: 12, color: COLORS.black, fontWeight: '300'}}>
            Découvrez les entreprises qui peuvent être les meilleures pour vous.
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <OffreCard data={data} />
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          marginTop: 30,
        }}>
        <View style={{width: '75%'}}>
          <Text style={{fontSize: 22, color: COLORS.black, fontWeight: '400'}}>
            Être inspiré!
          </Text>
          <Text style={{fontSize: 12, color: COLORS.black, fontWeight: '300'}}>
            Découvrez les entreprises populaires pour la collaboration.
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <OffreCard data={data} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.height * 0.65,
  },
  topSection: {
    flex: 1,
    width: SIZES.width,
    height: '100%',
    flexDirection: 'column',
    gap: 25,
  },
  HeaderContainer: {
    alignItems: 'center',
  },
  BestOfferSection: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 15,
  },
});

export default Home;
