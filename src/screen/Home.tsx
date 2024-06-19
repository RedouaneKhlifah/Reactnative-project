import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {COLORS, Images, SIZES} from '../constants';
import Header from '../components/Home/TopSection/Header';
import OffreCard, {
  IoffreData,
} from '../components/Home/BottomSection/OffreCard';
import {responsiveWidth} from '../utils/responsive';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '../store/AuthContext';
import CategoriesSection from '../components/Home/TopSection/CategoriesSection';
import axiosConfig from '../api/axios.config';
import SkeletonOffreCard from '../components/Home/BottomSection/SkeletonOffreCard';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigationRef} from '../store/NavigationContext';

const Home: React.FC = () => {
  const [data, setData] = useState<IoffreData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigationRef = useNavigationRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiClientWithToken = axiosConfig(true);
        const res = await apiClientWithToken.get(
          `/influencer/suggest-two-businesses`,
        );
        if (res.data) {
          setData(res.data);
        } else {
          setData(null);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        setData(null);

        await AsyncStorage.removeItem('data');
        navigationRef.current?.navigate('ContactMail');
      }
    };
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

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
        {loading ? <SkeletonOffreCard /> : data && <OffreCard data={data[0]} />}
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
        {loading ? <SkeletonOffreCard /> : data && <OffreCard data={data[1]} />}
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
