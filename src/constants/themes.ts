import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base Colors
  primary: '', // orange
  secondary: '', // gray

  // colors
  white: '#ffffff',
  black: '#000000',
  yellow: '#FAD932',
  gray: '#454545',
  orange: '#DD6400',
  defaultGray: 'rgba(60, 60, 67, 0.60)',
  grayHalfOpacity: 'rgba(147, 147, 151, 0.50)',
  lightGray: '#C9C9CB',
  LightGray2: 'rgba(217, 217, 217, 0.47)',
  darkGray: '#757575',
  purple: '#AB82FF',
  superLightGray: '#EBEBEB',
  lightOrnange: '#FFF6E5',
  mov: '#AB82FF',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 16,
  smallRadius: 8,
  middleRadius: 12,
  sm: 13,
  fullRadius: 999,
  padding: 24,
  padding2: 36,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  hs: 18,
  body0: 32,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 13,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: '',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  semiLargeTitle: {fontFamily: '', fontSize: SIZES.body0},
  h1: {fontFamily: '', fontSize: SIZES.h1},
  h2: {fontFamily: '', fontSize: SIZES.h2},
  hs: {fontFamily: '', fontSize: SIZES.hs},
  h3: {fontFamily: '', fontSize: SIZES.h3},
  h4: {fontFamily: '', fontSize: SIZES.h4},
  h5: {fontFamily: '', fontSize: SIZES.h5},

  body1: {
    fontFamily: '',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: '',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: '',
    fontSize: SIZES.body3,
  },
  body4: {
    fontFamily: '',
    fontSize: SIZES.body4,
  },
  body5: {
    fontFamily: '',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
