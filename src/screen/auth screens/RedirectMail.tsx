import { Image, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Images, SIZES, FONTS } from '../../constants';
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';
import BackButton from '../../components/ui/buttons/BackButton';
import { useAuth } from '../../store/AuthContext'; // Adjust the import path
import axiosConfig from '../../api/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationRef } from '../../store/NavigationContext';

const RedirectMail = () => {
  const { userData } = useAuth();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [code, setCode] = useState(['', '', '', '']);
  const apiClientWithToken = axiosConfig(true);
  const { isConfirmed,checkConfirmation } = useAuth();
  const navigationRef = useNavigationRef();

  useEffect(() => {    
    if (!isConfirmed) {
      sendEmailVerification()
    }
  }, [isConfirmed])

  const sendEmailVerification = async ()=>{
    try {
      const response = await apiClientWithToken.post(`/mail/send-mail-confirmation`);
      console.log('Code sent successfully:', response.data);
      checkConfirmation()
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  }
  
  const maskEmail = (email: string | undefined): string => {
    if (email) {
      const [username, domain] = email.split('@');
      const maskedUsername = username[0] + '***' + username.slice(-1);
      return `${maskedUsername}@${domain}`;
    }
    return '';
  };

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);

    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!text && index === 0) {
      inputRefs.current[0]?.focus();
    }
    if (text && index === inputRefs.current.length - 1) {
        Keyboard.dismiss();
        // If the code is complete, post the request
        if (newCode.join('').length === 4) {
          submitCode(newCode.join(''));
        }
      }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submitCode = async (code: string) => {
    try {
      const response = await apiClientWithToken.post(`/mail/confirm-mail/${code}`);
      console.log('Code submitted successfully:', response.data);
      const storedData = await AsyncStorage.getItem('data');
      if (storedData) {
        const data = JSON.parse(storedData);
        data.user.confirmed = true;
        await AsyncStorage.setItem('data', JSON.stringify(data));
        checkConfirmation()
        data.user.role ==="business" ? navigationRef.current?.navigate('BusinessProfile') : navigationRef.current?.navigate('Profile')
        
      }
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ display:'flex' ,width: SIZES.width,
      height: SIZES.height,}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={{ width: '100%' }}>
            <BackButton bgColor='yellow' />
          </View>
          <Image source={Images.mails} style={{ width: responsiveWidth(238), height: responsiveHeight(238) }} />
          <View style={{ display: 'flex', alignItems: 'center', gap: responsiveHeight(15), paddingTop: responsiveHeight(18) }}>
            <Text style={{ color: '#424242', fontSize: SIZES.h2, fontFamily: FONTS.body1.fontFamily }}>
              Nous vous avons envoyé un email
            </Text>
            <Text style={{ color: '#4E4E4E', fontSize: SIZES.sm, fontFamily: 'Poppins', textAlign: 'center' }}>
              Insérez le code à 4 chiffres {'\n'} que nous avons envoyé au {maskEmail(userData?.email)}
            </Text>
            <View style={styles.codeContainer}>
              {code.map((char, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={char}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.input}
                  textAlign="center"
                />
              ))}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text>Toujours rien? </Text>
              <Pressable><Text style={{ textAlign: 'center', color: '#AB82FF' }}>Renvoyer le code</Text></Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RedirectMail;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: SIZES.height,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: responsiveHeight(20),
    paddingHorizontal: responsiveWidth(15),
    width: SIZES.width,
    height: SIZES.height,
    gap: responsiveHeight(12)
  },
  text: {},
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 24,
    marginHorizontal: 3
  },
});
