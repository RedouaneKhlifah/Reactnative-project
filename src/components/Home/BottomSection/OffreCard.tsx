import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import OfferImages from './OfferImages'
import { COLORS, Icons, SIZES } from '../../../constants'
import { responsiveHeight, responsiveWidth } from '../../../utils/responsive'
import SocialMediaLinks from './SocialMediaLinks'

const OffreCard = () => {

  return (
    <View style = {styles.container}>
      <View style = {styles.imagesContainer} >
            <OfferImages/>
        </View>
      <View style = {{flexDirection: "row" , justifyContent :"space-between", alignItems : "center"}} >
        <View>
          <View style = {styles.titleContainer}>
            <Text style = {styles.title}>Sambara</Text>
            <Icons.verify/>        
           </View>
          <View>
            <Text style = {styles.location}>Tetouan, MA</Text>
          </View>
        </View>
        <View style = {styles.rating} >
          <Icons.star/>
          <Text style = {styles.ratingText}>4,9</Text>
        </View>

      </View>

      <View style = {styles.line}>
      </View>

      <View style = {styles.socialMediaLinksConatiner}>
        <View style = {styles.socialMediaLinksInnerConatiner}>
          <SocialMediaLinks Icon = {Icons.facbookLink}/>
          <SocialMediaLinks Icon = {Icons.instagramLink}/>
          <SocialMediaLinks Icon = {Icons.gougleMap}/>
          <SocialMediaLinks Icon = {Icons.TikTok}/>
        </View>
        <View style =  {styles.offreType}>
          <Text style  = {{color : "rgba(241, 59, 58, 0.80)" , fontSize  :11, fontWeight : "600"}}>Snack</Text>
        </View>

      </View>
    </View>
  )
}

const styles  = StyleSheet.create({
    container : {
        borderWidth : 1,
        borderColor : COLORS.purple,
        borderRadius : 24,
        marginBottom : 50,
        padding : responsiveWidth(13),
        gap : 15,
        flex :1
    },
    imagesContainer : {
        width : responsiveWidth(298),
        borderRadius : 24,
        overflow : "hidden"
    },
    titleContainer : {
      flexDirection : "row",
      alignItems : "center",
      gap : 2
    },
    title : {
        fontSize : 21,
        fontWeight : "400",
        paddingLeft : 11,
        color : COLORS.black
    },
    location : {
        fontSize  :13,
        fontWeight : "300",
        paddingLeft : 11,
        transform: [{ translateY: -3 }],
    },
    rating  : {
     width : responsiveWidth(87.73),
     height : responsiveHeight(35.58),
     backgroundColor : COLORS.lightOrnange,
     borderRadius : 20.5,
     flexDirection : "row",
     justifyContent : "center",
     alignItems : "center",
     gap  : 8
    },
    ratingText : {
      color : COLORS.orange,
      fontSize : 21,
      fontWeight : "900",
      fontFamily : "Holly Groove"
    },
    line: {
      borderBottomWidth : 1,
      borderColor : COLORS.superLightGray,
    },
    socialMediaLinksConatiner : {
      flexDirection : "row",
      justifyContent : "space-between",
      alignItems : "center"
    },
    socialMediaLinksInnerConatiner : {
      flexDirection : "row",
      gap : 6
    },
    offreType : {
      backgroundColor : "#FEEEEE",
      borderRadius : 20.5,
      alignItems : "center",
      width : responsiveWidth(65),
      height : responsiveHeight(24),
      justifyContent : "center"
    }

})

export default OffreCard