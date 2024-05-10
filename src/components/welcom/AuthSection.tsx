import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {appTheme} from '../../constants';
import InputWithLabel from '../ui/InputWithLabel';
import Button from '../ui/Button';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import FormSection from './FormSection';

const {COLORS, FONTS} = appTheme;
export enum AuthType {
  SignUp = 'SIGN_UP',
  Login = 'LOGIN',
}
export interface AuthSectionProp {
  type: AuthType;
}

const AuthSection: FC<AuthSectionProp> = ({type}) => {
  return (
    <View style={styles.Contianer}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenue</Text>
        <Text style={styles.semiTitle}>Commençons par votre numéro</Text>
      </View>
      <FormSection type={type} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          En continuant, vous acceptez automatiquement nos
        </Text>
        <View style={{flexDirection: 'row', gap: 3}}>
          <View>
            <Text style={[styles.footerText]}>
              conditions générales, notre politique de confidentialité
            </Text>
            <View
              style={{borderBottomWidth: 0.2, transform: [{translateY: -2}]}}
            />
          </View>
          <Text style={styles.footerText}>et</Text>
        </View>
        <View>
          <Text style={styles.footerText}>
            notre politique en matière de cookies.
          </Text>
          <View
            style={{borderBottomWidth: 0.2, transform: [{translateY: -2}]}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Contianer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    flex: 1,
    gap: responsiveHeight(15),
  },
  title: {
    ...FONTS.semiLargeTitle,
    color: COLORS.black,
    transform: [{translateY: 7}],
    fontSize: responsiveWidth(32),
  },
  semiTitle: {
    ...FONTS.body3,
    fontSize: responsiveWidth(13),
    fontWeight: '300',
    color: COLORS.black,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: responsiveHeight(27),
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
export default AuthSection;
