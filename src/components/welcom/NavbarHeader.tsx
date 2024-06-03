import {View, StyleSheet, Text, Pressable} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, Icons, SIZES} from '../../constants';
import {responsiveWidth} from '../../utils/responsive';
import BackButton from '../ui/buttons/BackButton';

interface NavbarHeaderProp {
  title: string;
  buttonTitle?: string;
}

const NavbarHeader: FC<NavbarHeaderProp> = ({title, buttonTitle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Pressable style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}>
          <Icons.backArrow />
        </Pressable> */}
        <BackButton/>
        <Text
          style={{
            ...FONTS.h3,
            fontSize: responsiveWidth(26),
            fontWeight: '400',
            color: COLORS.white,
            position: 'absolute',
            left: '50%',
            transform: [{translateX: -40}],
          }}>
          {title}
        </Text>

        {buttonTitle && (
          <Pressable
            style={({pressed}) => [
              {opacity: pressed ? 0.8 : 1},
              styles.textConatiner,
              {opacity: 1},
            ]}
            onPress={() => console.log('test')}>
            <Text style={styles.text}>{buttonTitle}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveWidth(33),
    position: 'relative',
  },
  textConatiner: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    height: '100%',
    borderRadius: SIZES.fullRadius,
  },
  text: {
    color: COLORS.black,
    paddingHorizontal: responsiveWidth(18),
    ...FONTS.h3,
  },
});

export default NavbarHeader;
