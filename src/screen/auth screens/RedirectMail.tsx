import { Image, StyleSheet, Text, View ,Pressable} from 'react-native'
import React from 'react'
import { Images, SIZES ,FONTS} from '../../constants'
import { responsiveHeight, responsiveWidth } from '../../utils/responsive'
import BackButton from '../../components/ui/buttons/BackButton'

const RedirectMail = () => {
  return (
    <View style={styles.container}>
        <View style={{width:'100%'}}>
        <BackButton bgColor='yellow'/>
        </View>        
        <Image source={Images.mails} style={{width:responsiveWidth(238),height:responsiveHeight(238)}}/>
        <View style={{display:'flex',alignItems:'center',gap:responsiveHeight(15),paddingTop:responsiveHeight(18)}}>
            <Text style={{color:'#424242',fontSize:SIZES.h2,fontFamily:FONTS.body1.fontFamily}}>
                Nous vous avons envoyé un email
            </Text>
            <Text style={{color:'#4E4E4E',fontSize:SIZES.sm,fontFamily:'Poppins', textAlign:'center'}}>
                Cliquez sur le lien de vérification par e-mail 
                {'\n'}envoyé à vous sur userinfo@gmail.com. 
                {'\n'}Cliquez ensuite sur suivant.
            </Text>
            <View >
                <Text>Vous n'avez pas encore reçu l'e-mail ?</Text>
                <Pressable><Text style={{textAlign:'center',color:'#AB82FF'}}>Envoyer à nouveau</Text></Pressable>
            </View>
        </View>
    </View>
  )
}

export default RedirectMail

const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        paddingVertical:responsiveHeight(20),
        paddingHorizontal:responsiveWidth(15),
        width:SIZES.width,
        height:SIZES.height,
        gap:responsiveHeight(12)
    },
    text:{

    }
})