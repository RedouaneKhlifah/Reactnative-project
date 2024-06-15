import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {COLORS, Images, SIZES} from '../constants';
import Header from '../components/Home/TopSection/Header';
import OffreCard from '../components/Home/BottomSection/OffreCard';
import {responsiveWidth} from '../utils/responsive';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '../store/AuthContext';
import CategoriesSection from '../components/Home/TopSection/CategoriesSection';

const Home: React.FC = () => {
  return (
    <ScrollView style={{marginBottom: 20, backgroundColor: COLORS.white}}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.topSection}
          source={Images.homeBackground2}>
          <View style={styles.HeaderContainer}>
            <Header />
          </View>

          <View style={styles.CategoriesSection}>
            <CategoriesSection />
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
        {/* <OffreCard data={[]} /> */}
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
        {/* <OffreCard data={data} /> */}
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
  CategoriesSection: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 15,
  },
});

export default Home;
