import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { COLORS, FONTS, Images, SIZES } from '../../../constants'
import BestOfferCards from './BestOfferCards'

const BestOfferSection = () => {
  return (
    <View style = {styles.container}>
        <View>
            <Text style  = {styles.title}>Envie d'une réduction ?</Text>
            <Text style  = {styles.subTitle}>Trouvez les meilleures offres ?</Text>
        </View>
        <View>
            <View style  = {styles.cardConatiner} >
            <BestOfferCards/>
           </View>            
        </View>

    </View>
  )
}

const styles  = StyleSheet.create({
    container : {
        width :"100%",
        flex : 1
    },
    title : {
        ...FONTS.body2,
        // fontSize : 20,
        color : COLORS.white,
        fontWeight : "400",
    },
    subTitle : {
        ...FONTS.body4,
        fontSize : 10,
        color : COLORS.white,
        fontWeight : "400",
        width : "42%",
        textAlign : "center",
        backgroundColor : COLORS.purple,
        borderRadius : SIZES.fullRadius
    },
    cardConatiner : { 
        height : "92%",
        paddingTop : "4%",
        width : "100%"
    },
    card : {
        height : "93%",
        width : "84%",
        borderRadius : 15,
        overflow : "hidden"
    },
    CardText : {
    ...FONTS.body2,
    fontSize : 20,
    color : COLORS.black,
    backgroundColor : COLORS.white,
    alignSelf: 'flex-start',
    marginTop :  "10%", 
    paddingHorizontal : 13,
    borderTopRightRadius : 12,
    borderBottomRightRadius : 12
}
    
})

export default BestOfferSection