import { View, StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import Prefix from './Prefix';
import Input from '../ui/Input';
import { COLORS, FONTS, SIZES } from '../../constants';
import LoginService from './LoginService';
import { Icons } from '../../constants'

const FormSection = () => {
  return (
    <View style  = {styles.FormSectionContainer}>
      {/* form inputes */}
    <View style={styles.formContainer}>
        <View style =  {styles.prefixContainer}>
          <Prefix />
        </View>
        <View style = {styles.inputContainer}>
          <Input />
        </View>
    </View>

     {/* bytton */}
    <Pressable style = {styles.Button} >
        <Text style  = {styles.buttonText}>Continuer</Text>
    </Pressable>
      {/* Line with Text "or" and another line */}
      
      <View style={styles.dividerContainer}>
        <View style={styles.straightLine} />
        <View style={styles.orTextContainer} >
          <Text style={styles.orText}>Ou avec</Text>
        </View>
        <View style={styles.straightLine} />
      </View>

        <View style  = {styles.loginServiceContainer}>
          <LoginService title='google' Icon={Icons.Google} />
          <LoginService title='Apple' Icon={Icons.Apple}/>
          <LoginService title='Facebook' Icon={Icons.Facbook}/>
          <LoginService title='Email' Icon={Icons.Email}/>
        </View>


    </View>
    
  );
};

const styles = StyleSheet.create({
  FormSectionContainer : {
    flex :1,
    gap : 15,
        width : "90%"
  },
  formContainer: {
    flex : 4,
    alignItems : "center",
    flexDirection : "row",
    gap : 15,
  },
  inputContainer: {
    justifyContent : "center",
    flex : 3,
  },
  prefixContainer : {
    flex : 1
  },
  Button : {
    alignItems : "center",
    justifyContent : "center",
    backgroundColor : COLORS.purple,
    borderRadius : SIZES.fullRadius,
    flex :  4,
  },
  buttonText : {
    ...FONTS.body2,
    color : COLORS.white
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex : 1
  },
  straightLine: {
    flex: 1,
    borderWidth : 0.6,
    borderColor :  COLORS.lightGray,
    backgroundColor : "black"
  },
  orTextContainer : {
    justifyContent : "center",
    paddingHorizontal: 10,
  },
  orText: {
    ...FONTS.body5,
    fontSize : 13,
    color: COLORS.lightGray,
    fontWeight : "400",
    lineHeight : 13,
    flex :1,
  },
  loginServiceContainer : {
    flex : 20
  },

});

export default FormSection;
