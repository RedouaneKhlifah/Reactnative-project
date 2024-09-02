import {View, StyleSheet, Text, Pressable} from 'react-native';
import React, {FC, useState} from 'react';
import Prefix from './Prefix';
import Input from '../ui/Input';
import {COLORS, FONTS, SIZES} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import InputWithLabel from '../ui/InputWithLabel';
import Button from '../ui/Button';
import {AuthSectionProp} from './AuthSection';
import {useNavigationRef} from '../../store/NavigationContext';
import {useAuth} from '../../store/AuthContext'; // Adjust the import path
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../ui/buttons/PrimaryButton';
import {LightSpeedOutLeft} from 'react-native-reanimated';

interface FormSectionProp extends AuthSectionProp {}

enum AuthType {
  SignUp = 'SIGN_UP',
  Login = 'LOGIN',
}

const FormSection: FC<FormSectionProp> = ({type}) => {
  const navigationRef = useNavigationRef();
  const {userData, handleAuth} = useAuth();
  const [loading, setLoading] = useState(false);
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
  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleNavigate = () => {
    if (navigationRef.current?.getCurrentRoute()?.name === 'Login') {
      navigationRef.current?.navigate('Signup');
    } else {
      navigationRef.current?.navigate('Login');
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const onSubmit = async () => {
    setLoading(true);
    try {
      // Check for empty fields
      if (!formData.email) {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Adresse e-mail requise',
        }));
        setLoading(false);
        return;
      }

      if (!formData.password) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: 'Mot de passe requis',
        }));
        setLoading(false);
        return;
      }

      // Email validation
      if (!emailRegex.test(formData.email)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Adresse e-mail invalide',
        }));
        setLoading(false);
        return;
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: '',
        }));
      }

      // Password validation
      if (!passwordRegex.test(formData.password)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: 'Mot de passe trop faible.',
        }));
        setLoading(false);
        return;
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: '',
        }));
      }

      if (type == AuthType.SignUp) {
        if (!formData.confirmPassword) {
          setErrors(prevErrors => ({
            ...prevErrors,
            confirmPassword: 'Confirmation du mot de passe requise',
          }));
          setLoading(false);
          return;
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
          setErrors(prevErrors => ({
            ...prevErrors,
            confirmPassword: 'Les mots de passe ne correspondent pas.',
          }));
          setLoading(false);
          return;
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            confirmPassword: '',
          }));
        }
      }

      let result;
      if (type === AuthType.Login) {
        result = await handleAuth('/login', formData);
      } else {
        const url = await AsyncStorage.getItem('registerUrl');
        if (url) {
          result = await handleAuth(url, formData);
        } else {
          throw new Error('Registration URL not found');
        }
      }

      if (result?.success) {
        // no user logged and confirmed
        const user = result?.data.user;

        if (user.confirmed === true) {
          if (user.status === 'approved') {
            if (user.role === 'business') {
              navigationRef.current?.navigate('BusinessProfile', {
                id: user.user_id,
              });
            } else if (user.role === 'influencer') {
              navigationRef.current?.navigate('Home');
            }
          } else {
            navigationRef.current?.navigate('Verification');
          }
        } else {
          navigationRef.current?.navigate('RedirectMail');
        }
      } else if (result?.success === false) {
        if (result.data.error) {
          setErrors(result.data.error);
        } else {
          setErrors(result.data);
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formSection}>
      <InputWithLabel
        labelText={'Email'}
        placeholder={'hello@gmail.com'}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
        value={formData.email}
        inputStyle={{
          fontSize: responsiveWidth(11),
          color: COLORS.black,
          fontWeight: '500',
        }}
        onChangeText={text => handleChange('email', text)}
      />
      {errors?.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <InputWithLabel
        labelText={'Mot de passe'}
        placeholder={'Votre mot de passe ...'}
        value={formData.password}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
        inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        onChangeText={text => handleChange('password', text)}
        secureTextEntry={true}
      />
      {errors?.password && (
        <Text style={styles.errorText}>{errors?.password}</Text>
      )}
      {typeof errors === 'string' && (
        <Text style={styles.errorText}>{errors}</Text>
      )}

      {type == AuthType.SignUp && (
        <>
          <InputWithLabel
            labelText={'Confirmer la Mot de passe'}
            placeholder={'Confirmer password'}
            value={formData.confirmPassword}
            labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
            inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
            onChangeText={text => handleChange('confirmPassword', text)}
            secureTextEntry={true}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </>
      )}

      <View style={{width: '100%'}}>
        {/* <Button
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
        /> */}
        <PrimaryButton
          title="Continuer"
          loading={loading}
          textStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: COLORS.purple,
            borderRadius: 54,
            width: '100%',
            elevation: 0,
          }}
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
            {type == AuthType.SignUp
              ? 'Avez vous déjà un compte?'
              : "Vous n'avez pas encore de compte?"}
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
