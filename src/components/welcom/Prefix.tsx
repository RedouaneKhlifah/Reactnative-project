import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { appTheme } from '../../constants'
import { Icons } from '../../constants'

const {COLORS , FONTS , SIZES} = appTheme
const Prefix = () => {
  return (
    <View style  = {styles.container}  >
        <View style  = {styles.leftContainer}>
            <View style  = {styles.leftInnerContainer}>
                <View style = {styles.leftUpContainer}>
                    <Text style = {styles.text}>Préfixe</Text>
                </View>
                <View style  = {styles.leftdownContainer}>
                    <Icons.morroco/>
                    <Text style = {styles.numberCode}>+212</Text>
                </View>
            </View>
        </View>
        <View style  = {styles.rightContainer} >
            <Icons.downArrow />
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        borderWidth  : 1,
        borderRadius : SIZES.middleRadius,
        flexDirection :"row",

        alignItems : "center",
        flex :1,
    },
    leftContainer : {
        flex : 3,
        alignItems : "center",
        justifyContent : "center",
        height : "90%",
    },
    leftInnerContainer :{
        width : "65%",
        height : "90%",
        flex : 1
    },
    leftUpContainer : {
        justifyContent : "center",
           flex : 1
    },
    leftdownContainer : {
        flexDirection  :"row",
        alignItems : "center",
        // backgroundColor : "yellow",
        gap : 3,
        flex : 1
    },
    text : {
        ...FONTS.body5,
        color : COLORS.grayHalfOpacity,
    },
    numberCode :{
        ...FONTS.body5,
        color : COLORS.grayHalfOpacity
    },
    rightContainer: {
        justifyContent : "center",
        alignItems : "center",
        flex : 1

    }
})

export default Prefix