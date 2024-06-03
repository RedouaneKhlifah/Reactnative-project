import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { COLORS, Icons, Images, SIZES } from '../../constants';
import { responsiveHeight, responsiveWidth } from '../../utils/responsive';
import BackButton from '../../components/ui/buttons/BackButton';
import InputWithLabel from '../../components/ui/InputWithLabel';
import Dropdown from '../../components/ui/Dropdown';
import SecondaryButton from '../../components/ui/buttons/SecondaryButton';
import { useNavigationRef } from '../../store/NavigationContext';

const BusinessDetails = () => {
  const navigationRef = useNavigationRef();
  const [selectedType, setSelectedType] = useState(null);  
  const [types, setTypes] = useState([
    {label: 'Type1', value: 'Type1'},
    {label: 'Type2', value: 'Type2'}
  ]);

  const saveChanges = ()=>{

    navigationRef.current?.navigate('BusinessProfile')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground 
          source={Images.homeBackground} 
          style={styles.backgroundImage}
        >
            <BackButton bgColor={COLORS.mov} color={COLORS.white} />
            <View style={{display:'flex',width:'80%'}}>
              <Text style={styles.title}>les détails  {'\n'} d'entreprise</Text>
            </View>
        </ImageBackground>
      </View>

      <Text style={[styles.galleryTitle,{marginTop: 20,}]}>Galerie d'images</Text>
      <ScrollView horizontal contentContainerStyle={styles.imageGallery}>
        <TouchableOpacity style={styles.imageContainer}>
        <Image
                source={Icons.plusPn}
                style={{
                  width: responsiveWidth(19),
                  height: responsiveHeight(25),
                }}
                resizeMode="contain"
              />        
              </TouchableOpacity>
        <Image source={Images.restaurant} style={styles.image} />
        <Image source={Images.restaurant} style={styles.image} />
        <Image source={Images.restaurant} style={styles.image} />
      </ScrollView>

      <Text style={styles.galleryTitle}>Logo d'entreprise</Text>
      <View style={{width:'100%',display:'flex'}}>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Télécharger ici</Text>
        </TouchableOpacity>
      </View>

      <InputWithLabel
          labelText="Nom légal de l'entreprise"
          placeholder="Sombara"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',marginBottom:20}}
        />
      
      <InputWithLabel
          labelText="ICE"
          placeholder="ICE..."
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',marginBottom:20}}
        />
      {/* <Dropdown
            label="Type d'entreprise"
            placeholder='Text'
            value={selectedType}
            items={types}
            setValue={setSelectedType}
            setItems={setTypes}
            maxHeight={120}
      /> */}

      <InputWithLabel
          labelText="Brevet"
          placeholder="Text"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',marginBottom:20}}
        />

      <InputWithLabel
          labelText="Numéro de téléphone"
          keyboardType='phone-pad'
          placeholder="+212 666666666"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',marginBottom:20}}
        />
      
      <InputWithLabel
          labelText="Email"
          placeholder="Text@gmail.com"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',marginBottom:20}}
      />

      <InputWithLabel
          labelText="Adresse d'affaires"
          placeholder="Rue ....."
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',marginBottom:20}}
      />
      <InputWithLabel
          labelText="Type d'entreprise"
          placeholder="Text"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',marginBottom:20}}
      />

      <SecondaryButton title='Save changes' onPress={saveChanges} buttonStyle={styles.saveButton} textStyle={styles.saveButtonText}/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width:SIZES.width,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20) ,
    paddingBottom:responsiveHeight(20)

  },
  backgroundContainer: {
    width:SIZES.width,
    overflow: 'hidden',
    borderBottomLeftRadius: responsiveWidth(20),
    borderBottomRightRadius: responsiveWidth(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: responsiveWidth(17),
    elevation: 5,
  },
  backgroundImage: {
    display:'flex',
    justifyContent:'flex-start',
    flexDirection:'row',
    minHeight:responsiveHeight(160),
    paddingVertical: 20,
    paddingHorizontal: responsiveWidth(20) ,
    alignItems: 'center',
    objectFit:'cover',
    textAlign:'center',
    borderBottomLeftRadius:150
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
    textAlign:'center',
    marginTop:35
  },
  galleryTitle: {
    fontSize: 16,
    color:'#757575',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',

  },
  imageGallery: {
    alignItems: 'flex-start', // Align items to start
    flexDirection: 'row',
    minWidth:SIZES.width,
    marginBottom: 20,

  },
  imageContainer: {
    width: responsiveWidth(110) ,
    height: responsiveWidth(100),
    borderRadius:responsiveWidth(20),
    marginRight: 20,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 24,
    color: '#aaa',
  },
  image: {
    width: responsiveWidth(110) ,
    height: responsiveWidth(100),
    marginRight: 20,
    borderRadius:responsiveWidth(20),

  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  uploadButton: {
    display:'flex',
    borderWidth: 1,
    paddingVertical: 9,
    marginBottom: 15,
    borderRadius:responsiveWidth(15),
    width:responsiveWidth(160),
  },
  uploadButtonText: {
    color: '#757575',
    textAlign:'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    width: '100%',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    elevation:0,
    width:SIZES.width * 0.9,
    paddingVertical:18
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BusinessDetails;
