import { View, Text, StyleSheet, ScrollView ,ImageBackground ,Image, Pressable } from 'react-native'
import React from 'react'
import { COLORS, FONTS, Icons, Images, SIZES } from '../../constants'
import InputWithLabel from '../ui/InputWithLabel'
import DatePicker from 'react-native-date-picker'
import DateInputWithLbel from '../ui/DateInputWithLbel'
import Selector from '../ui/Selector'

const ProfileBody = () => {
  return (
    <ScrollView style = {styles.container} >
        <View style = {styles.ImageContainer} >
            <ImageBackground style = {styles.ImageInnerContainer} source={Images.profileImage} resizeMode='cover'>
                <Icons.pen/>
            </ImageBackground>
        </View>
        <View style = {styles.fomContainer}>
            <InputWithLabel labelText='Nome et Prenom' placeholder='Nome et Prenom'/>
            <InputWithLabel labelText='Email' placeholder='Text@gmail.com'/>
            <InputWithLabel labelText='Numéro de téléphone' placeholder='+212 666666666'/>
            <DateInputWithLbel labelText='Date de Naissance' placeholder='jj/mm/aaaa'/>
            <View style = {styles.SelectorsContainer}>
                <Selector labelText={'Sexe'}/>
                <Selector labelText={'Social Media'}/>
                <Selector labelText={'Interets'}/>
            </View>

            <Pressable style = {styles.button}>
                <Text style = {styles.buttonText}>Save changes</Text>
            </Pressable>



        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container : {
        width : "90%",
        marginBottom : 40
    },
    ImageContainer : {
        height : SIZES.height * 0.2,
        alignItems : "center",
        justifyContent : "center",
        overflow : "hidden"
    },
    ImageInnerContainer : {
        borderRadius : SIZES.fullRadius,
        backgroundColor : COLORS.purple,
        width : 85,
        height : 85,
        justifyContent : "flex-end",
        alignItems : "flex-end"
    },
    fomContainer : {
        gap : 12       
    },
    SelectorsContainer : {
        gap :12
    },
    button : {
        backgroundColor : COLORS.yellow,
        borderRadius : SIZES.fullRadius,
        alignItems : "center",
        justifyContent : "center",
        paddingVertical : 10,
    },
    buttonText : {     
        ...FONTS.body2,   
        fontSize: 16,
        color: COLORS.white,
        fontWeight: "400"
    }

})


export default ProfileBody