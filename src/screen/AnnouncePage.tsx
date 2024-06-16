import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {COLORS, Icons, Images, SIZES} from '../constants';
import SelectedOffreImages from '../components/AnnouncePage/TopSection.tsx/SelectedOffreImages';
import OffreInfo from '../components/Home/BottomSection/OffreInfo';
import LineBetween from '../components/Home/BottomSection/LineBetween';
import SocialMediaLinks from '../components/Home/BottomSection/SocialMediaLinks';
import OffreRating from '../components/Home/BottomSection/OffreRating';
import SimilairesOffre from '../components/AnnouncePage/buttomSection/SimilairesOffre';
import DateInputWithLbel from '../components/ui/DateInputWithLbel';
import InputWithLabel from '../components/ui/InputWithLabel';
import {responsiveHeight, responsiveWidth} from '../utils/responsive';
import SecondaryButton from '../components/ui/buttons/SecondaryButton';
import {RouteProp} from '@react-navigation/native';
import axiosConfig from '../api/axios.config';
import {IoffreData} from '../components/Home/BottomSection/OffreCard';
import {useNavigationRef} from '../store/NavigationContext';
import SkeletonAnnouncePage from '../skelton/SkeletonAnnouncePage';
import PrimaryButton from '../components/ui/buttons/PrimaryButton';
import axios from 'axios';

export const offreImagesData = [
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

type OffersScreenProp = RouteProp<RootStackParamList, 'AnnouncePage'>;

const AnnouncePage: FC<{route: OffersScreenProp}> = ({route}) => {
  const {id} = route.params;

  const [data, setData] = useState<IoffreData | null>(null);
  const [suggestedBusinesses, setSuggestedBusinesses] = useState<
    IoffreData[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<{ message: string | null }>({ message: '' });

  const [submitError, setSubmitError] = useState({
    number_of_people:''
  });
  const apiClientWithToken = axiosConfig(true);

  const [iterationData,setIterationData] = useState({
    business_profile_id: data?.id,
    date: "",
    time: "",
    number_of_people: '',
    message: ""
  })

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClientWithToken.get(
          `/influencer/get-business/${id}`,
        );

        if (res.data.business) {
          setData(res.data.business);
          setIterationData((prevData)=>({
            ...prevData,
            'business_profile_id': res.data.business.id
          }))          
          setSuggestedBusinesses(res.data.suggested_businesses);
        } else {
          setData(null);
          setSuggestedBusinesses(null);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        setData(null);
        setSuggestedBusinesses(null);
      }
    };
    fetchData();

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  }, [id]);
  console.log(successMessage);
  

  const handleSubmit = async() => {
    console.log(iterationData);
    setSubmitLoading(true)
    try {
      const res = await apiClientWithToken.post('influencer/add-interaction',iterationData)
      if (res) {
        console.log(res.data);
        setSuccessMessage({message:'Sent successfully'})
        setIterationData((prevData)=>({
          ...prevData,
          date:'',
          message:'',
          time:'',
          number_of_people:'',
        }))
        setTimeout(() => {
          setSuccessMessage({message:null})
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data.errors)        
      } 
    }
    finally{
      setSubmitLoading(false)
    }
  };

  if (loading) {
    return <SkeletonAnnouncePage />;
  }

  if (!data) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  const navigationRef = useNavigationRef();

  return (
    <ScrollView ref={scrollViewRef} style={{backgroundColor: COLORS.white}}>
      <View style={{marginBottom: 22}}>
        <SelectedOffreImages data={data.gallery_images_filenames} />
        <Pressable
          onPress={() =>
            navigationRef.current?.navigate('OffersScreen', {
              categoryId: data.category.id,
              name: data.category.name,
            })
          }
          style={({pressed}) => [
            {opacity: pressed ? 0.8 : 1},
            {position: 'absolute', top: 20, left: 15},
          ]}>
          <Icons.backArrow2 />
        </Pressable>
      </View>
      <View style={{gap: 22, backgroundColor: COLORS.white}}>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <OffreInfo
              title={data.name}
              location={data.address}
              iconSize={18}
            />
            <OffreRating views={data.views} />
          </View>
        </View>
        <LineBetween lineStyle={{borderWidth: 1}} />
        <View style={{width: '90%', alignSelf: 'center', gap: 15}}>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: '400', color: COLORS.black}}>
              Description:
            </Text>
            <Text style={{fontSize: 14, fontWeight: '300', lineHeight: 22}}>
              {data.description}
            </Text>
          </View>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: '400', color: COLORS.black}}>
              Formulaire:
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: SIZES.width * 0.4}}>
                <DateInputWithLbel 
                  placeholder="Date" 
                  mode="date" 
                  onDateChange={formattedDate => {
                    setIterationData((prevData)=>({
                      ...prevData,
                      'date':formattedDate
                    }));
                  }}
                  />
              </View>
              <View style={{width: SIZES.width * 0.4}}>
                <DateInputWithLbel 
                  placeholder="Heure" 
                  mode="time"
                  initialValue=''
                  onDateChange={formattedDate => {
                    setIterationData((prevData)=>({
                      ...prevData,
                      'time':formattedDate
                    }));
                  }} 
                  />
              </View>
            </View>
            <InputWithLabel
              placeholder="Nombre de personnes"
              labelStyle={{
                fontSize: responsiveWidth(13),
                color: COLORS.darkGray,
              }}
              value={iterationData.number_of_people}
              onChangeText={text => {
                setIterationData((prevData)=>({
                  ...prevData,
                  'number_of_people':text
                }));
              }}
              inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500',paddingVertical:responsiveHeight(10)}}
              keyboardType="numeric"
            />
            {submitError?.number_of_people && <Text style={styles.errorText}>{submitError.number_of_people[0]}</Text>}

            <InputWithLabel
              labelText="Message"
              multiline={true}
              numberOfLines={10}
              value={iterationData.message}
              onChangeText={text => {
                setIterationData((prevData)=>({
                  ...prevData,
                  'message':text
                }));
              }}
              placeholder="Ecrivez votre message ici …"
              labelStyle={{
                fontSize: responsiveWidth(13),
                color: COLORS.darkGray,
              }}
              inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
            />
            <View style={styles.container}>
              {successMessage.message && 
                <Text style={styles.successText}>{successMessage.message}</Text>
              }
            </View>
            <PrimaryButton
              title="Envoyer"
              loading={submitLoading}
              onPress={handleSubmit}
              buttonStyle={{backgroundColor: '#AB82FF', marginVertical: 15,elevation:0}}
              textStyle={{color: 'white'}}
            />

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
            {suggestedBusinesses?.map((item, index) => (
              <SimilairesOffre key={index} data={item} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: responsiveWidth(11),
    marginTop: responsiveHeight(1),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 16,
  },
})

export default AnnouncePage;
