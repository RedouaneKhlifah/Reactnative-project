import React, {FC} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {COLORS} from '../../../constants';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';

const SkeletonOffreCard: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <Animated.View style={styles.skeletonImage} />
      </View>
      <View style={{flex: 1, width: '82%', alignSelf: 'center', gap: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Animated.View style={styles.skeletonTitle} />
          <Animated.View style={styles.skeletonRating} />
        </View>

        <View style={styles.line}></View>
        <View style={styles.socialMediaLinksConatiner}>
          <View style={styles.socialMediaLinksInnerConatiner}>
            <Animated.View style={styles.skeletonIcon} />
            <Animated.View style={styles.skeletonIcon} />
            <Animated.View style={styles.skeletonIcon} />
            <Animated.View style={styles.skeletonIcon} />
          </View>
          <Animated.View style={styles.skeletonType} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 6,
          }}>
          <View style={{flexDirection: 'row', gap: 6}}>
            <Animated.View style={styles.skeletonButton} />
            <Animated.View style={styles.skeletonButton} />
          </View>
          <Animated.View style={styles.skeletonButton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 24,
    padding: responsiveWidth(13),
    gap: 15,
    flex: 1,
  },
  imagesContainer: {
    width: responsiveWidth(298),
    borderRadius: 12,
    overflow: 'hidden',
  },
  skeletonImage: {
    height: responsiveHeight(200),
    backgroundColor: '#E0E0E0',
  },
  skeletonTitle: {
    width: '60%',
    height: responsiveHeight(30),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  skeletonRating: {
    width: responsiveWidth(90),
    height: responsiveHeight(35),
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  },
  line: {
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
  },
  socialMediaLinksConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialMediaLinksInnerConatiner: {
    flexDirection: 'row',
    gap: 6,
  },
  skeletonIcon: {
    width: responsiveWidth(25),
    height: responsiveHeight(25),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  skeletonType: {
    width: responsiveWidth(60),
    height: responsiveHeight(35),
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  },
  skeletonButton: {
    width: responsiveWidth(50),
    height: responsiveHeight(50),
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
  },
});

export default SkeletonOffreCard;
