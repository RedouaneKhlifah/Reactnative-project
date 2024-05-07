import { View, Text, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Images, SIZES } from '../constants'
import Input from '../components/ui/Input'
import SearchInput from '../components/ui/SearchInput'
import Header from '../components/Home/TopSection/Header'
import BestOfferSection from '../components/Home/TopSection/BestOfferSection'
import OffreCard from '../components/Home/BottomSection/OffreCard'
import { responsiveWidth } from '../utils/responsive'
import OfferImages from '../components/Home/BottomSection/OfferImages'

const Home = () => {
  return (
    <ScrollView>
        <View style={styles.container}>
            <ImageBackground 
                style={styles.topSection} 
                source={Images.homeBackground2}
            >
                <View style = {styles.HeaderContainer}>
                    <Header/>
                </View>
                <View style = {styles.BestOfferSection}>
                    <BestOfferSection/>
                </View>
            </ImageBackground>
        </View>
        <View style  = {{alignItems : 'center'}}>
            <OffreCard/>
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {        
        height: SIZES.height * 0.6, 
    },
    topSection: {
        flex :1,
       width: SIZES.width,
       height: '100%',
       flexDirection : 'column',
       gap : 25
    },
    HeaderContainer : {
        alignItems : "center",
    },
    BestOfferSection : {
        flex : 1,
        alignItems : "center",
        marginLeft : 15
    }

})

export default Home
