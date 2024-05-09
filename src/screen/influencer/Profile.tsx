import {StyleSheet, ImageBackground, View, Text, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, Images, SIZES} from '../../constants';
import SecondaryButton from '../../components/ui/buttons/SecondaryButton';
import RnIcon from '../../components/ui/RnIcon';
import BackButton from '../../components/ui/buttons/BackButton';

export default function Profile() {
  const items = [
    {icon:'link-variant',title:'Détails de profile'},
    {icon:'share-variant',title:'Parrainez et gagnez'},
    {icon:'share-variant',title:'Évaluez nous'},
    {icon:'logout',title:'Se déconnecter'}
  ]
  const handlePress = () => {
    // Your onPress logic here
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.topSection} source={Images.milfayaBg}>
      <View style={styles.overlay}>
          <View style={styles.options}>
            <BackButton onPress={handlePress}/>
            <SecondaryButton onPress={handlePress} title="aide" />
          </View>
          <View style={styles.profileOptions}>
            <View style={styles.userCard}>
              <View style={styles.userInfo}>
                <Image source={Images.milfayaPro} style={styles.profilePic}/>
                <View>
                  <Text style={{fontSize:SIZES.radius,fontWeight:'700'}}>Milfaya</Text>
                  <Text style={{fontSize:SIZES.middleRadius}}>+91 1234567890</Text>
                </View>
              </View>
              <RnIcon name='pencil-outline' color='white' bgColor='#FAD932' width={45} height={45} size={20}/>
            </View>
            <View style={styles.linksHolder}>
              {
                items.map((item,index)=>{
                  return(
                    <View style={styles.link} key={index}>
                      <View style={styles.userInfo}>
                        <RnIcon name={item.icon} color='black' size={24}/>
                        <Text style={{fontFamily:FONTS.body3.fontFamily,fontSize:SIZES.radius}}>{item.title}</Text>

                      </View>
                      <RnIcon name='chevron-right' color='black' size={16}/>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    display: 'flex',
  },
  topSection: {
    flex: 1,
    justifyContent: 'space-between',
    width: SIZES.width,
    height: SIZES.height * 0.35,
    flexDirection: 'column',
    resizeMode: 'cover', // or 'stretch' or 'contain'
    gap: 65,
    position: 'relative',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    paddingTop: '10%',
    alignItems: 'center',
  },
  profileOptions: {
    position: 'absolute',
    display:'flex',
    paddingHorizontal: 10,
    paddingVertical: 27,
    height: '70%',
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  userCard:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    paddingBottom:16,
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#EBEBEB'
  },
  userInfo:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:16
  },
  profilePic:{
    width: 80,
    height: 80,
    borderRadius: 1000,
  },
  linksHolder:{
    display:'flex',
    paddingHorizontal: 10,
  },
  link:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical: 18,

  }
});
