import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {Key, useEffect, useState} from 'react';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import InputWithLabel from '../ui/InputWithLabel';
import DateInputWithLbel from '../ui/DateInputWithLbel';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import Dropdown from '../ui/Dropdown';
import RnIcon from '../ui/RnIcon';
import {useAuth} from '../../store/AuthContext';
import PrimaryButton from '../ui/buttons/PrimaryButton';
import {launchImageLibrary} from 'react-native-image-picker';
import axiosConfig from '../../api/axios.config';
import axios from 'axios';
import {useNavigationRef} from '../../store/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InfluencerData} from '../../interfaces/User';

type SocialMedia = 'facebook' | 'instagram' | 'youtube'; // Define the types of social media

const ProfileBody = () => {
  const {userData, checkConfirmation} = useAuth();

  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
  const [links, setLinks] = useState<{[key in SocialMedia]?: string}>({});
  const [selectedIntrests, setSelectedIntrests] = useState<string[] | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null | undefined>(null);
  const [loading, setloading] = useState(false);
  const [imgloading, setImgloading] = useState(false);
  const apiClientWithToken = axiosConfig(true, 'multipart/form-data');
  const [isEdit, setIsEdit] = useState(false);
  const [influencerData, setinfluencerData] = useState<InfluencerData | null>(
    null,
  );
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    image: '',
    interests: '',
  });
  const navigationRef = useNavigationRef();

  const [profileData, setProfileData] = useState({
    firstName: isEdit ? influencerData?.first_name : '',
    lastName: '',
    email: userData?.email || '',
    phone: '',
    date_of_birth: '',
  });

  const [genders, setgenders] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'female', value: 'female'},
  ]);
  const [socialLinks, setSocialLinks] = useState([
    {
      label: 'facebook',
      value: 'facebook',
      icon: () => <RnIcon name="facebook" />,
    },

    {
      label: 'instagram',
      value: 'instagram',
      icon: () => <RnIcon name="instagram" />,
    },
    {
      label: 'youtube',
      value: 'youtube',
      icon: () => <RnIcon name="youtube" />,
    },
  ]);
  const [interets, setInterets] = useState([
    {label: 'Hotels', value: 'Hotels'},
    {label: 'Bien-être', value: 'Bien-être'},
    {label: 'Mode', value: 'Mode'},
    {label: 'Beauté', value: 'Beauté'},
    {label: 'Fitness', value: 'Fitness'},
    {label: 'Voyage et Tourisme', value: 'Voyage et Tourisme'},
    {label: 'Restauration', value: 'Restauration'},
    {label: 'Technologies', value: 'Technologies'},
    {label: 'Divertissement', value: 'Divertissement'},
    {label: 'Education – Art et culture', value: 'Education – Art et culture'},
  ]);

  useEffect(() => {
    if (
      userData?.status === 'approved' &&
      userData.completed &&
      userData.confirmed
    ) {
      getProfileData();
      setIsEdit(true);
    }
  }, [userData]);

  useEffect(() => {
    if (influencerData) {
      setProfileData({
        firstName: influencerData.first_name || '',
        lastName: influencerData.last_name || '',
        email: influencerData.email || userData?.email || '',
        phone: influencerData.phone || '',
        date_of_birth: influencerData.date_of_birth || '',
      });
      setSelectedGender(influencerData.gender || null);
      setSelectedIntrests(influencerData.interests || null);
      setSelectedDate(influencerData.date_of_birth || null);
      setImageUri(null);
      const data: string[] = [];
      Object.keys(influencerData.social_media_links).map(key => {
        data.push(key);
        setLinks(prevStat => ({
          ...prevStat,
          [key]: influencerData.social_media_links[key],
        }));
      });
      setSelectedSocialMedia(data);
      // setSelectedSocialMedia(influencerData.social_media_links||null)
      setImageUri(influencerData.profile_image_url || null);
    }
  }, [influencerData]);

  const getProfileData = async () => {
    try {
      const res = await apiClientWithToken.get('/influencer/get');
      setinfluencerData(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const renderItem = ({item}: {item: SocialMedia}) => (
    <View style={styles.linkContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
        <RnIcon name={item} size={20} />
        <TextInput
          style={styles.input}
          placeholder={`${item} link`}
          value={links[item] || ''}
          onChangeText={(text: string) => handleLinkChange(item, text)}
        />
      </View>
    </View>
  );
  const handleLinkChange = (socialMedia: SocialMedia, link: string) => {
    setLinks({...links, [socialMedia]: link});
  };
  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
      response => {
        setImgloading(true);
        if (response.didCancel) {
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setImageUri(selectedImage.uri);
          setImgloading(false);
        }
      },
    );
  };

  const handleInputChange = (name: string, value: any) => {
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    if (imageUri) {
      const file = {
        uri: imageUri,
        type: 'image/jpeg', // or the appropriate mime type for your image
        name: 'profile.jpg', // you can give any name to the image
      };
      formData.append('image', file);
    }

    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('first_name', profileData.firstName);
    formData.append('last_name', profileData.lastName);
    formData.append('date_of_birth', selectedDate);
    formData.append('gender', selectedGender);

    Object.keys(links).forEach(key => {
      formData.append(key, links[key as SocialMedia] || '');
    });

    selectedIntrests?.forEach((interest: string) => {
      formData.append('interests[]', interest);
    });
    setloading(true);
    try {
      const response = await apiClientWithToken.post(
        isEdit ? '/influencer/update' : 'influencer/submit',
        formData,
      );
      if (response.data) {
        const storedData = await AsyncStorage.getItem('data');
        if (storedData) {
          const data = JSON.parse(storedData);
          data.user.completed = true;
          await AsyncStorage.setItem('data', JSON.stringify(data));
          checkConfirmation();
          isEdit
            ? navigationRef.current?.navigate('profile', {isUpdated: Date.now()})
            : navigationRef.current?.navigate('Verification');
        }
      }
      setloading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          setErrors(error.response?.data.errors);
        }
      }
      setloading(true);

      console.error('Error submitting form:', error);
    } finally {
      setloading(true);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.ImageContainer}>
        <ImageBackground
          style={styles.ImageInnerContainer}
          source={{uri: imageUri ? imageUri : ''}}
          resizeMode="cover"></ImageBackground>
        <Pressable
          onPress={handleImagePick}
          style={{position: 'absolute', bottom: 15, right: 0}}>
          <Icons.pen />
        </Pressable>
      </View>
      {errors?.image && <Text style={styles.errorText}>{errors.image[0]}</Text>}

      <View style={styles.fomContainer}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <View style={{width: '50%'}}>
            <InputWithLabel
              labelText="Nome"
              placeholder="Nome"
              value={profileData.lastName}
              onChangeText={text => handleInputChange('lastName', text)}
              labelStyle={{
                fontSize: responsiveWidth(13),
                color: COLORS.darkGray,
              }}
              inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
            />
            {errors?.last_name && (
              <Text style={styles.errorText}>{errors.last_name[0]}</Text>
            )}
          </View>

          <View style={{width: '50%'}}>
            <InputWithLabel
              labelText="Prenom"
              placeholder="Prenom"
              value={profileData.firstName}
              onChangeText={text => handleInputChange('firstName', text)}
              labelStyle={{
                fontSize: responsiveWidth(13),
                color: COLORS.darkGray,
              }}
              inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
            />
            {errors?.first_name && (
              <Text style={styles.errorText}>{errors.first_name[0]}</Text>
            )}
          </View>
        </View>
        <InputWithLabel
          labelText="Email"
          placeholder={userData?.email ?? ''}
          disabled={userData?.email ? true : false}
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        />
        {errors?.email && (
          <Text style={styles.errorText}>{errors.email[0]}</Text>
        )}
        <InputWithLabel
          labelText="Numéro de téléphone"
          placeholder="+212 666666666"
          value={profileData.phone}
          onChangeText={text => handleInputChange('phone', text)}
          labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
          inputStyle={{fontSize: responsiveWidth(11), fontWeight: '500'}}
        />
        {errors?.phone && (
          <Text style={styles.errorText}>{errors.phone[0]}</Text>
        )}

        <DateInputWithLbel
          labelText="Date de Naissance"
          placeholder="jj/mm/aaaa"
          mode="date"
          initialValue={profileData.date_of_birth || ''}
          onDateChange={formattedDate => {
            setSelectedDate(formattedDate);
          }}
        />
        {errors?.date_of_birth && (
          <Text style={styles.errorText}>{errors.date_of_birth[0]}</Text>
        )}

        <View style={styles.SelectorsContainer}>
          <Dropdown
            label="Sexe"
            placeholder="male"
            value={selectedGender}
            items={genders}
            setValue={setSelectedGender}
            setItems={setgenders}
            maxHeight={120}
            labelTextStyle={{fontSize: 16, color: COLORS.darkGray}}
          />
          {errors?.gender && (
            <Text style={styles.errorText}>{errors.gender[0]}</Text>
          )}

          <Dropdown
            label="Social Media"
            placeholder="facebook ..."
            value={selectedSocialMedia}
            items={socialLinks}
            setValue={setSelectedSocialMedia}
            setItems={setSocialLinks}
            maxHeight={120}
            multiple={true}
          />
          <FlatList<SocialMedia>
            data={selectedSocialMedia as SocialMedia[]}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
          <Dropdown
            label="Interets"
            placeholder="Interets"
            value={selectedIntrests}
            items={interets}
            setValue={setSelectedIntrests}
            setItems={setInterets}
            maxHeight={350}
            multiple={true}
          />
          {errors?.interests && (
            <Text style={styles.errorText}>{errors.interests[0]}</Text>
          )}
        </View>
        <PrimaryButton
          onPress={handleSubmit}
          loading={loading}
          title={isEdit ? 'mettre à jour' : 'Sauvegarder'}
          textStyle={{color: COLORS.white}}
          buttonStyle={{elevation: 0, borderRadius: 20}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 40,
    backgroundColor: COLORS.white,
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
    borderWidth : 0.2,
    borderColor : COLORS.purple,
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
    width: '100%',
    fontWeight: '300',
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
    paddingVertical: 0,
    paddingLeft: 3,
  },
  label: {
    marginRight: 10,
    minWidth: 70,
  },
  errorText: {
    color: 'red',
    fontSize: responsiveWidth(11),
    marginTop: responsiveHeight(1),
  },
});

export default ProfileBody;
