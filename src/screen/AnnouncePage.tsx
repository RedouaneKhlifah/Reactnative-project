import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {IoffreImagesData} from '../components/Home/BottomSection/OffreCard';
import {COLORS, Icons, Images, SIZES} from '../constants';
import SelectedOffreImages from '../components/AnnouncePage/TopSection.tsx/SelectedOffreImages';
import SelectedOffreInfoSection from '../components/AnnouncePage/TopSection.tsx/SelectedOffreInfoSection';
import OffreInfo from '../components/Home/BottomSection/OffreInfo';
import LineBetween from '../components/Home/BottomSection/LineBetween';
import SocialMediaLinks from '../components/Home/BottomSection/SocialMediaLinks';
import OffreRating from '../components/Home/BottomSection/OffreRating';
import SimilairesOffre from '../components/AnnouncePage/buttomSection/SimilairesOffre';
import DateInputWithLbel from '../components/ui/DateInputWithLbel';
import InputWithLabel from '../components/ui/InputWithLabel';
import { responsiveWidth } from '../utils/responsive';
import SecondaryButton from '../components/ui/buttons/SecondaryButton';

export const offreImagesData: IoffreImagesData[] = [
  {
    id: 1,
    image: Images.selctedImage,
  },
  {
    id: 2,
    image: Images.testImage,
  },
  {
    id: 3,
    image: Images.offreImage,
  },
];
const AnnouncePage = () => {
  const handleSubmit = ()=>{
    console.log("here");
    
  }
  return (
    <ScrollView>
      <View style={{marginBottom: 22}}>
        <SelectedOffreImages data={offreImagesData} />
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.8 : 1},
            {position: 'absolute', top: 20, left: 15},
          ]}>
          <Icons.backArrow2 />
        </Pressable>
      </View>
      <View style={{gap: 22}}>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <OffreInfo title="Sambara" location="Tetouan, MA" iconSize={18} />
            <OffreRating rating={4.5} />
          </View>
        </View>
        <LineBetween lineStyle={{borderWidth: 1}} />
        <View style={{width: '90%', alignSelf: 'center', gap: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <SocialMediaLinks icon={Icons.instagramLink} size={33} />
            <SocialMediaLinks icon={Icons.Tiktok} size={33} />
            <SocialMediaLinks icon={Icons.gougleMap} size={33} />
            <SocialMediaLinks icon={Icons.youtub} size={33} />
            <SocialMediaLinks icon={Icons.facbookLink} size={33} />
          </View>

          <View>
            <Text
              style={{fontSize: 18, fontWeight: '400', color: COLORS.black}}>
              Description:
            </Text>
            <Text style={{fontSize: 14, fontWeight: '300', lineHeight: 22}}>
              Ce restaurant pourrait vous faire plaisir avec un poulet
              délectable. Un personnel qualifié attend les clients tout au long
              de l'année. Un service luxueux est toujours un plaisir. Sombara
              Martil est connu pour une atmosphère calme. Google lui donne un
              score de 4, vous pouvez donc choisir ce lieu pour y passer du bon
              temps.
            </Text>
          </View>
          <View>
            <Text
                style={{fontSize: 18, fontWeight: '400', color: COLORS.black}}>
                Formulaire:
            </Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{width:SIZES.width * 0.4}}>
                <DateInputWithLbel
                  placeholder="Date"
                  mode='date'
                />
              </View>
              <View style={{width:SIZES.width * 0.4 }}>
                <DateInputWithLbel
                  placeholder="Heure"
                  mode='time'
                />
              </View>
            </View>
              <InputWithLabel
                placeholder="Nombre de personnes"
                labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
                inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
                keyboardType='numeric'
              />
              <InputWithLabel
                labelText="Message"
                multiline={true}
                numberOfLines={10}
                placeholder="Ecrivez votre message ici …"
                labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
                inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
              />
              <SecondaryButton title='Envoyer' onPress={handleSubmit} buttonStyle={{backgroundColor:"#AB82FF",marginVertical:15}} textStyle={{color:'white'}}/>
          </View>

          <View>
            <Text
              style={{fontSize: 20, fontWeight: '400', color: COLORS.black}}>
              Autres businesses similaires
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              rowGap: 10,
            }}>
            <SimilairesOffre />
            <SimilairesOffre />
            <SimilairesOffre />
            <SimilairesOffre />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnnouncePage;
