import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
  FlatList
} from 'react-native';
import React, { useState } from 'react';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import InputWithLabel from '../ui/InputWithLabel';
import DatePicker from 'react-native-date-picker';
import DateInputWithLbel from '../ui/DateInputWithLbel';
import Selector from '../ui/Selector';
import {responsiveHeight, responsiveWidth} from '../../utils/responsive';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';


const ProfileBody = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'female', value: 'banana'}
  ]);
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
            open={open}
            label='Sexe'
            placeholder='male'
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={true}
            maxHeight={120}
            dropDownDirection="TOP"
            placeholderStyle={{
              fontSize: 14,
              fontStyle: 'italic'
            }}
            labelTextStyle={{
              fontWeight: 'bold'
            }}
          />          
          <Selector labelText={'Social Media'} />
          <Selector labelText={'Interets'} />
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
});

export default ProfileBody;
