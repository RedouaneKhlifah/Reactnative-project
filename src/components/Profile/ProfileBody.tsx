import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
  FlatList,
  TextInput
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import InputWithLabel from '../ui/InputWithLabel';
import DatePicker from 'react-native-date-picker';
import DateInputWithLbel from '../ui/DateInputWithLbel';
import Selector from '../ui/Selector';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import RnIcon from '../ui/RnIcon';

type SocialMedia = 'facebook' | 'instagram' | 'youtube'; // Define the types of social media

const ProfileBody = () => {
  const [selectedGender, setSelectedGender] = useState(null);  
  const [selectedSocialMedia, setSelectedSocialMedia] = useState([]);
  const [links, setLinks] = useState<{ [key in SocialMedia]?: string }>({});

  const [selectedIntrests, setSelectedIntrests] = useState(null);
  const [genders, setgenders] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'female', value: 'banana'}
  ]);
  const [socialLinks, setSocialLinks] = useState([
    {
      label: 'facebook', 
      value: 'facebook',
      icon: () => <RnIcon name='facebook'/>
    },
    
    {
      label: 'instagram', 
      value: 'instagram',      
      icon: () => <RnIcon name='instagram'/>
    },
    {
      label: 'youtube', 
      value: 'youtube',      
      icon: () => <RnIcon name='youtube'/>
    },
  ]);
  const [interets, setInterets] = useState([
    {label: 'Restaurants', value: 'Restaurants'},
    {label: 'Hotels', value: 'Hotels'},
    {label: 'Shops', value: 'Shops'}
  ]);

  const renderItem = ({ item }: { item: SocialMedia }) => (
    <View style={styles.linkContainer}>
      <View style={{display:'flex', flexDirection:'row',alignItems:'center', gap:5}}>
        <RnIcon name={item} size={20}/>
        {/* <InputWithLabel
          placeholder={`${item} link`}
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
          
        /> */}
        <TextInput
          style={styles.input}
          placeholder={`${item} link`}
          value={links[item] || ''}
          onChangeText={(text:string) => handleLinkChange(item, text)}
        />
      </View>
    </View>
  );
  const handleLinkChange = (socialMedia: SocialMedia, link: string) => {
    setLinks({ ...links, [socialMedia]: link });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.ImageContainer}>
        <ImageBackground
          style={styles.ImageInnerContainer}
          source={Images.testImage}
          resizeMode="cover"></ImageBackground>
        <Icons.pen style={{position: 'absolute', bottom: 15, right: 0}} />
      </View>
      <View style={styles.fomContainer}>
        <InputWithLabel
          labelText="Nome et Prenom"
          placeholder="Nome et Prenom"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        />
        <InputWithLabel
          labelText="Email"
          placeholder="Text@gmail.com"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        />
        <InputWithLabel
          labelText="Numéro de téléphone"
          placeholder="+212 666666666"
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        />
        <DateInputWithLbel
          labelText="Date de Naissance"
          placeholder="jj/mm/aaaa"
        />
        <View style={styles.SelectorsContainer}>
          <Dropdown
            label='Sexe'
            placeholder='male'
            value={selectedGender}
            items={genders}
            setValue={setSelectedGender}
            setItems={setgenders}
            maxHeight={120}
          />
          <Dropdown
            label='Social Media'
            placeholder='facebook ...'
            value={selectedSocialMedia}
            items={socialLinks}
            setValue={setSelectedSocialMedia}
            setItems={setSocialLinks}
            maxHeight={120}
            multiple={true}
          />
          <FlatList
            data={selectedSocialMedia}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
          <Dropdown
            label='Interets'
            placeholder='Interets'
            value={selectedIntrests}
            items={interets}
            setValue={setSelectedIntrests}
            setItems={setInterets}
            maxHeight={120}
            multiple={true}
          />       
        </View>

        <Button
          buttonStyle={{
            backgroundColor: COLORS.yellow,
            borderRadius: 20,
            marginTop: 10,
          }}
          titleStyle={{
            fontSize: 18,
            paddingVertical: 10,
            color: COLORS.white,
            fontWeight: '400',
          }}
          title={'Save changes'}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 40,
  },
  ImageContainer: {
    height: SIZES.height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  ImageInnerContainer: {
    borderRadius: SIZES.fullRadius,
    backgroundColor: COLORS.purple,
    width: responsiveWidth(90),
    height: responsiveWidth(90),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  fomContainer: {
    gap: responsiveHeight(12),
  },
  SelectorsContainer: {
    gap: responsiveHeight(12),
  },
  button: {
    backgroundColor: COLORS.yellow,
    borderRadius: SIZES.fullRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    ...FONTS.body2,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '400',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width:"100%",
    fontWeight: '300',
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
    paddingVertical: 0,
    paddingLeft: 3,
  },
  label: {
    marginRight: 10,
    minWidth:70
  },
});

export default ProfileBody;
