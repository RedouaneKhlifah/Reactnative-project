import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import BackButton from '../../components/ui/buttons/BackButton';
import InputWithLabel from '../../components/ui/InputWithLabel';
import SecondaryButton from '../../components/ui/buttons/SecondaryButton';
import {useNavigationRef} from '../../store/NavigationContext';
import {useAuth} from '../../store/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import axiosConfig from '../../api/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {BusinessData} from '../../interfaces/User';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';

const BusinessDetails = () => {
  const navigationRef = useNavigationRef();
  const apiClientWithToken = axiosConfig(true, 'multipart/form-data');
  const [isEdit, setIsEdit] = useState(false);
  const {userData, checkConfirmation} = useAuth();
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [loading, setloading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [businessdetails, setBusinessdetails] = useState<BusinessData | null>(
    null,
  );

  useEffect(() => {
    getCategories();
    if (
      userData?.status === 'approved' &&
      userData.completed &&
      userData.confirmed
    ) {
      getBusinessData();
      setIsEdit(true);
    }
  }, [userData]);

  useEffect(() => {
    if (businessdetails) {
      setBusinessData({
        name: businessdetails.name || '',
        ice: businessdetails.ice || '',
        email: businessdetails.email || '',
        phone: businessdetails.phone || '',
        patent: businessdetails.patent || '',
        address: businessdetails.address || '',
        description: businessdetails.description || '',
        category_id: businessdetails.category?.id || 0,
      });
      const newUris: string[] | undefined = businessdetails?.gallery_image_urls;
      setImageUris(prevUris => [...prevUris, ...(newUris || [])]);
    }
  }, [businessdetails]);

  const getCategories = async () => {
    await apiClientWithToken
      .get('/categories/index')
      .then(res => {
        setCategoriesData(res.data.business_categories);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const [businessData, setBusinessData] = useState({
    name: '',
    ice: '',
    email: userData?.email || '',
    phone: '',
    patent: '',
    address: '',
    description: '',
    category_id: 0,
  });

  const [errors, setErrors] = useState({
    name: '',
    ice: '',
    email: '',
    phone: '',
    patent: '',
    address: '',
    description: '',
    category_id: '',
  });

  const handleInputChange = (name: string, value: any) => {
    setBusinessData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
        selectionLimit: 0, // Set to 0 for multiple images
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImages = response.assets
            .map(asset => asset.uri)
            .filter((uri): uri is string => uri !== undefined);

          setImageUris(prevUris => [...prevUris, ...selectedImages]);
        }
      },
    );
  };

  const handleCategoryChange = (itemValue: number | null) => {
    if (itemValue) {
      setBusinessData(prevData => ({
        ...prevData,
        category_id: itemValue,
      }));
    }
  };
  const getBusinessData = async () => {
    try {
      const res = await apiClientWithToken.get('/business/get');
      setBusinessdetails(res.data);
      console.log('businessdetailsbusinessdetails', res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const saveChanges = async () => {
    const formData = new FormData();

    imageUris.forEach((uri, index) => {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('images[]', {
        uri,
        name: `photo_${index}.${fileType}`,
        type: `image/${fileType}`,
      });
    });

    formData.append('email', businessData.email);
    formData.append('phone', businessData.phone);
    formData.append('address', businessData.address);
    formData.append('category_id', String(businessData.category_id));
    formData.append('ice', businessData.ice);
    formData.append('patent', businessData.patent);
    formData.append('description', businessData.description);
    formData.append('name', businessData.name);

    setloading(true);
    try {
      const response = await apiClientWithToken.post(
        isEdit ? '/business/update' : '/business/submit',
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
            ? navigationRef.current?.navigate('BusinessProfile', {
                id: response.data.user_id,
              })
            : navigationRef.current?.navigate('Verification');
        }
      }
      setloading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error request:', error.request);
        console.log('Error response:', error.response?.data);
        if (error.response?.data) {
          setErrors(error.response?.data.errors);
        }
      }
      console.error('Error submitting form:', error);
    } finally {
      setloading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={Images.homeBackground}
          style={styles.backgroundImage}>
          <BackButton bgColor={COLORS.mov} color={COLORS.white} />
          <View style={{display: 'flex', width: '80%'}}>
            <Text style={styles.title}>les détails {'\n'} d'entreprise</Text>
          </View>
        </ImageBackground>
      </View>

      <Text style={[styles.galleryTitle, {marginTop: 20}]}>
        Galerie d'images
      </Text>
      <ScrollView horizontal contentContainerStyle={styles.imageGallery}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleImagePick}>
          <Image
            source={Icons.plusPn}
            style={{
              width: responsiveWidth(19),
              height: responsiveHeight(25),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {imageUris.map((uri, index) => (
          <Image key={index} source={{uri}} style={styles.image} />
        ))}
      </ScrollView>

      <InputWithLabel
        labelText="Nom légal de l'entreprise"
        placeholder="Sombara"
        value={businessData.name}
        onChangeText={text => handleInputChange('name', text)}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          fontWeight: '500',
          marginBottom: 20,
        }}
      />
      {errors?.name && <Text style={styles.errorText}>{errors.name[0]}</Text>}

      <InputWithLabel
        labelText="ICE"
        placeholder="ICE..."
        value={businessData.ice}
        onChangeText={text => handleInputChange('ice', text)}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          fontWeight: '500',
          marginBottom: 20,
        }}
      />
      {errors?.ice && <Text style={styles.errorText}>{errors.ice[0]}</Text>}

      <InputWithLabel
        labelText="Patente"
        placeholder="Text"
        value={businessData.patent}
        onChangeText={text => handleInputChange('patent', text)}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          fontWeight: '500',
          marginBottom: 20,
        }}
      />
      {errors?.patent && (
        <Text style={styles.errorText}>{errors.patent[0]}</Text>
      )}

      <InputWithLabel
        labelText="Numéro de téléphone"
        keyboardType="phone-pad"
        placeholder="+212 666666666"
        value={businessData.phone}
        onChangeText={text => handleInputChange('phone', text)}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          fontWeight: '500',
          marginBottom: 20,
        }}
      />
      {errors?.phone && <Text style={styles.errorText}>{errors.phone[0]}</Text>}

      <InputWithLabel
        labelText="Email"
        placeholder={userData?.email ?? ''}
        disabled={userData?.email ? true : false}
        value={businessData.email}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          fontWeight: '500',
          marginBottom: 20,
        }}
      />
      {errors?.email && <Text style={styles.errorText}>{errors.email[0]}</Text>}

      <InputWithLabel
        labelText="Adresse d'affaires"
        placeholder="Rue ....."
        value={businessData.address}
        onChangeText={text => handleInputChange('address', text)}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          fontWeight: '500',
          marginBottom: 20,
        }}
      />
      {errors?.address && (
        <Text style={styles.errorText}>{errors.address[0]}</Text>
      )}

      <InputWithLabel
        labelText="Description"
        placeholder="..."
        value={businessData.description}
        onChangeText={text => handleInputChange('description', text)}
        labelStyle={{fontSize: responsiveWidth(13), color: COLORS.darkGray}}
        inputStyle={{
          fontSize: responsiveWidth(11),
          fontWeight: '500',
          marginBottom: 20,
        }}
      />
      {errors?.description && (
        <Text style={styles.errorText}>{errors.description[0]}</Text>
      )}
      <View style={styles.picker}>
        <Text style={styles.pickerLabel}>Type</Text>
        <Picker
          selectedValue={businessData.category_id}
          onValueChange={(itemValue: number | null) =>
            handleCategoryChange(itemValue)
          }>
          <Picker.Item
            label="Select a category"
            value={null}
            style={styles.pickerInput}
          />
          {categoriesData.map((category: {id: number; name: string}) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
      {errors?.category_id && (
        <Text style={styles.errorText}>{errors.category_id[0]}</Text>
      )}

      <PrimaryButton
        title={isEdit ? 'mise à jour' : 'Sauvegarder'}
        loading={loading}
        onPress={saveChanges}
        buttonStyle={styles.saveButton}
        textStyle={styles.saveButtonText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    paddingBottom: responsiveHeight(20),
  },
  backgroundContainer: {
    width: SIZES.width,
    overflow: 'hidden',
    borderBottomLeftRadius: responsiveWidth(20),
    borderBottomRightRadius: responsiveWidth(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: responsiveWidth(17),
    elevation: 5,
  },
  backgroundImage: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    minHeight: responsiveHeight(160),
    paddingVertical: 20,
    paddingHorizontal: responsiveWidth(20),
    alignItems: 'center',
    objectFit: 'cover',
    textAlign: 'center',
    borderBottomLeftRadius: 150,
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
    textAlign: 'center',
    marginTop: 35,
  },
  galleryTitle: {
    fontSize: 16,
    color: '#757575',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  imageGallery: {
    alignItems: 'flex-start', // Align items to start
    flexDirection: 'row',
    minWidth: SIZES.width,
    marginBottom: 20,
  },
  imageContainer: {
    width: responsiveWidth(110),
    height: responsiveWidth(100),
    borderRadius: responsiveWidth(20),
    marginRight: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 24,
    color: '#aaa',
  },
  image: {
    width: responsiveWidth(110),
    height: responsiveWidth(100),
    marginRight: 20,
    borderRadius: responsiveWidth(20),
  },
  pickerLabel: {
    fontSize: responsiveWidth(13),
    color: COLORS.darkGray,
    fontWeight: '400',
    paddingLeft: 3,
    transform: [{translateY: 8}],
  },
  uploadButton: {
    display: 'flex',
    borderWidth: 1,
    paddingVertical: 9,
    marginBottom: 15,
    borderRadius: responsiveWidth(15),
    width: responsiveWidth(160),
  },
  uploadButtonText: {
    color: '#757575',
    textAlign: 'center',
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
    elevation: 0,
    width: SIZES.width * 0.9,
    paddingVertical: 18,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
    paddingLeft: 0,
    height: responsiveHeight(85),
  },
  selectedText: {
    fontSize: 18,
    marginTop: 20,
  },
  pickerInput: {
    fontWeight: '300',
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
    paddingVertical: 0,
    paddingLeft: 3,
    fontSize: responsiveWidth(11),
  },
  errorText: {
    color: 'red',
    fontSize: responsiveWidth(11),
    marginTop: responsiveHeight(1),
  },
});

export default BusinessDetails;
