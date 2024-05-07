import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { appTheme } from '../../constants'
import FormSection from './FormSection'

const {COLORS , FONTS , SIZES} = appTheme

const LoginSection  = () => {
  return (
    <View style = {styles.Contianer}>
        <View style  = {styles.header}>
            <Text style = {styles.title}>Bienvenue</Text>
            <Text style = {styles.semiTitle}>Commençons par votre numéro</Text>
        </View>
        <View style = {styles.formSection}>
            <FormSection/>
        </View>
        <View style = {styles.footer}>
            <Text style  = {styles.footerText}>En continuant, vous acceptez automatiquement nos conditions générales, notre politique de confidentialité et notre politique en matière de cookies.</Text>
        </View>
    </View>
  )
}

const styles  = StyleSheet.create({
    Contianer : {
        backgroundColor : COLORS.white,
        borderTopLeftRadius : 45,
        borderTopRightRadius : 45,
        flex : 1,
        gap : 15
    },
    title : {
        ...FONTS.semiLargeTitle ,
        color : COLORS.black,
        transform: [{ translateY: 7 }],
        fontSize : 34,
    },semiTitle : {
        ...FONTS.body3 ,
        fontSize : 15,
        fontWeight : "300",
        color : COLORS.black,
    },
    header : {
        flex :1,
        justifyContent : "flex-end",
        alignItems : "center"
    },
    formSection : {
        flex :6,
        alignItems : "center"
    },
    footer : {
        flex :  2,
        alignItems : "center",
    },
    footerText : {
        textAlign : "center",
        width : "90%" ,
        ...FONTS.h4,
        fontWeight : "300"
    }

})
export default LoginSection