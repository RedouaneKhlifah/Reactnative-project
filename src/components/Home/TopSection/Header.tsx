import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import SearchInput from '../../ui/SearchInput'
import { Images, SIZES } from '../../../constants'

const Header = () => {
  return (
    <View style  = {styles.Header}>
      <ImageBackground source={Images.Union} style = {{height : 38 ,width :38}}>
      </ImageBackground>
      <SearchInput/>
      <ImageBackground source={Images.Union} style = {{height : 38 ,width :38}}>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  Header :{
      marginTop : SIZES.height * 0.03,
      flexDirection : "row",
      width : "95%",
      justifyContent : 'space-between'
  }
})

export default Header