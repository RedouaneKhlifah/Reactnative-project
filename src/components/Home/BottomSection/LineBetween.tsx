import {View, StyleSheet, StyleProp, TextStyle} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '../../../constants';

const LineBetween: FC<{lineStyle: StyleProp<TextStyle>}> = ({lineStyle}) => {
  return <View style={[styles.line, lineStyle]}></View>;
};

const styles = StyleSheet.create({
  line: {
    borderColor: COLORS.superLightGray,
  },
});

export default LineBetween;
