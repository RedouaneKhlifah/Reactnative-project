import React, {FC, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';

const SkeletonCard = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animationValue]);

  const opacityAnimation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return <Animated.View style={[styles.card, {opacity: opacityAnimation}]} />;
};

const styles = StyleSheet.create({
  card: {
    height: responsiveHeight(210),
    width: responsiveWidth(246),
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
  },
});

export default SkeletonCard;
