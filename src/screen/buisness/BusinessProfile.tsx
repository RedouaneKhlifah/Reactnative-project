import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, Icons, Images, SIZES} from '../../constants';
import SecondaryButton from '../../components/ui/buttons/SecondaryButton';
import RnIcon from '../../components/ui/RnIcon';
import BackButton from '../../components/ui/buttons/BackButton';
import {responsiveWidth} from '../../utils/responsive';
import {useNavigationRef} from '../../store/NavigationContext';

const BusinessProfile = () => {
  const navigationRef = useNavigationRef();

  const items = [
    {
      icon: Icons.location,
      title: "Détails de l'prise",
      link: 'BusinessDetails' as keyof RootStackParamList,
    },
    {icon: Icons.Lock, title: 'Sécurité du compte'},
    {icon: Icons.share, title: 'Parrainez et gagnez'},
    {icon: Icons.starIcon, title: 'Évaluez nous'},
    {icon: Icons.signout, title: 'Se déconnecter'},
  ];
  const handlePress = () => {
    // Your onPress logic here
    console.log('Button pressed!');
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.topSection} source={Images.homeBackground}>
        <View style={styles.overlay}>
          <View style={styles.options}>
            <BackButton
              onPress={handlePress}
              bgColor={COLORS.mov}
              color={COLORS.white}
            />
            <Text style={styles.title}>Sambara</Text>
            <SecondaryButton
              onPress={handlePress}
              title="aide"
              buttonStyle={{elevation: 0}}
            />
          </View>
          <View style={styles.profileOptions}>
            <View style={styles.userCard}>
              <View style={styles.userInfo}>
                <Image source={Images.restaurant} style={styles.profilePic} />
                <View>
                  <Text
                    style={{
                      fontSize: SIZES.body2,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {"Nom de l'entreprise"}
                  </Text>
                  <Text style={{fontSize: SIZES.middleRadius, color: 'black'}}>
                    category
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.linksHolder}>
              {items.map((item, index) => {
                return (
                  <Pressable
                    style={styles.link}
                    key={index}
                    onPress={() => {
                      item.link && navigationRef.current?.navigate(item.link);
                    }}>
                    <View style={styles.userInfo}>
                      <Image
                        source={item.icon}
                        style={{width: 24, height: 24}}
                      />
                      <Text
                        style={{
                          fontFamily: FONTS.body3.fontFamily,
                          fontSize: SIZES.radius,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <RnIcon name="chevron-right" color="black" size={16} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    position: 'relative',
  },
  overlay: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
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
    display: 'flex',
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: 27,
    height: SIZES.height * 0.8,
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.05,
    shadowRadius: 17,
    elevation: 6,
  },
  userCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 1000,
  },
  linksHolder: {
    display: 'flex',
    paddingHorizontal: 10,
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default BusinessProfile;
