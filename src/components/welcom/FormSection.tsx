import {View, StyleSheet, Text, Pressable} from 'react-native';
import React, {FC} from 'react';
import Prefix from './Prefix';
import Input from '../ui/Input';
import {COLORS, FONTS, SIZES} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import InputWithLabel from '../ui/InputWithLabel';
import Button from '../ui/Button';
import {AuthSectionProp} from './AuthSection';

interface FormSectionProp extends AuthSectionProp {}

enum AuthType {
  SignUp = 'SIGN_UP',
  Login = 'LOGIN',
}

const FormSection: FC<FormSectionProp> = ({type}) => {
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
      />
      <InputWithLabel
        labelText={'Password'}
        placeholder={'Your password ...'}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
        inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
      />

      {type == AuthType.SignUp && (
        <InputWithLabel
          labelText={'Confirmer la Mot de passe'}
          placeholder={'Confirmer password'}
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.black}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        />
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
          onPress={() => {}}
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
            Avez vous déjà un compte?
          </Text>
          <Pressable
            style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
            onPress={() => {}}>
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
});

export default FormSection;
