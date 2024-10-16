import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {COLORS, Images} from '../../constants'; // Adjust the import path as necessary
import {responsiveWidth} from '../../utils/responsive';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import {useNavigationRef} from '../../store/NavigationContext';
import {useAuth} from '../../store/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
  const navigationRef = useNavigationRef();
  const {handleLogout} = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = () => {
    console.log('meeew');

    navigationRef.current?.navigate('Home');
  };
  const submit = () => {
    AsyncStorage.removeItem('data')
      .then(() => {
        navigationRef.current?.navigate('ContactMail');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={Images.requestVerification} style={styles.image} />

        <View style={{paddingHorizontal: responsiveWidth(45)}}>
          <Text style={styles.title}>Votre demande a été soumise!</Text>
          <Text style={styles.subtitle}>
            Vous recevrez une notification une fois votre compte validé.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Se déconnecter"
          onPress={submit}
          loading={loading}
          buttonStyle={{
            width: '80%',
            elevation: 0,
            borderRadius: 54,
            marginTop: 10,
            backgroundColor: '#FAD9323B',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#424242',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 40,
  },
  notificationButton: {
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});

export default NotificationScreen;
