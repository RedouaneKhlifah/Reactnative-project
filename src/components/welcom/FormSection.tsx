import {View, StyleSheet, Text, Pressable} from 'react-native';
import React, {FC, useState} from 'react';
import Prefix from './Prefix';
import Input from '../ui/Input';
import {COLORS, FONTS, SIZES} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import InputWithLabel from '../ui/InputWithLabel';
import Button from '../ui/Button';
import {AuthSectionProp} from './AuthSection';
import { useNavigationRef } from '../../store/NavigationContext';
import axiosConfig from '../../api/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../store/AuthContext'; // Adjust the import path
import axios from 'axios';

interface FormSectionProp extends AuthSectionProp {}

enum AuthType {
  SignUp = 'SIGN_UP',
  Login = 'LOGIN',
}

const FormSection: FC<FormSectionProp> = ({type}) => {
  const apiClientWithoutToken = axiosConfig(false);
  const navigationRef = useNavigationRef();
  const { isAuthenticated,checkAuthentication,handleAuth } = useAuth();
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (name:string, value:string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleNavigate = ()=>{    
    if (navigationRef.current?.getCurrentRoute()?.name === 'Login') {
      navigationRef.current?.navigate('Signup')
    }else{
      navigationRef.current?.navigate('Login')
    }
  }
  const onSubmit  = async()=>{
    if (type === AuthType.Login) {
      const result = await handleAuth('/login', formData);
      if (result.success === false) {
        setErrors(result.data.error)
      }
      
    }else{
      const result = await handleAuth('/register-influencer-user',formData)
      if (result.success === false) {
        setErrors(result.data?.errors)
      }

    }
  }

//   const handleAuth = async ()=>{
//     let url = ''
//     if (type === AuthType.Login) {
//       url = '/login'
//     }else{
//       url = '/register-influencer-user'
//     }
//     console.log(url);
    
//     try {
//       const response = await apiClientWithoutToken.post(url, formData);
//       if (response.data) {
//         console.log(response.data);
              
//         await AsyncStorage.setItem('data',JSON.stringify(response.data))
//         checkAuthentication()
//         navigationRef.current?.navigate('RedirectMail')
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log(error);
        
//         // Axios error handling
//         if (error.response) {
//           setErrors(error.response.data);
//         }
//       }
//   }
// }
  return (
    <View style={styles.formSection}>
      <InputWithLabel
        labelText={'Email'}
        placeholder={'hello@gmail.com'}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          color: COLORS.black,
          fontWeight: '500',
        }}
        onChangeText={(text) => handleChange('email', text)}
      />
      {errors?.email && <Text style={styles.errorText}>{errors.email[0]}</Text>}

      <InputWithLabel
        labelText={'Password'}
        placeholder={'Your password ...'}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
        inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry= {true}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password[0]}</Text>}

      {type == AuthType.SignUp && (
        <>
        <InputWithLabel
          labelText={'Confirmer la Mot de passe'}
          placeholder={'Confirmer password'}
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          secureTextEntry= {true}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword[0]}</Text>}

        </>
        
      )}

      <View style={{width: '100%'}}>
        <Button
          buttonStyle={{
            backgroundColor: COLORS.purple,
            borderRadius: 54,
            width: '100%',
          }}
          titleStyle={{
            fontSize: responsiveWidth(16),
            fontWeight: '400',
            color: COLORS.white,
            paddingVertical: responsiveHeight(10),
          }}
          title="Continuer"
          onPress={onSubmit}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: responsiveHeight(12),
            justifyContent: 'center',
            gap: responsiveWidth(4),
          }}>
          <Text
            style={{
              fontSize: responsiveWidth(13),
            }}>
            {type == AuthType.SignUp ? 'Avez vous déjà un compte?' : "Vous n'avez pas encore de compte?"}
          </Text>
          <Pressable
            style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
            onPress={handleNavigate}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: responsiveWidth(13),
                color: COLORS.purple,
              }}>
              {type == AuthType.SignUp ? 'se connecter' : "S'inscrire"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formSection: {
    flex: 6,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    gap: responsiveHeight(15),
  },
  footer: {
    flex: 2,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  footerText: {
    textAlign: 'center',
    ...FONTS.h4,
    fontSize: responsiveWidth(14),
    fontWeight: '300',
    color: COLORS.defaultGray,
  },
  errorText: {
    color: 'red',
    fontSize: responsiveWidth(11),
    marginTop: responsiveHeight(1),
  },
});

export default FormSection;
