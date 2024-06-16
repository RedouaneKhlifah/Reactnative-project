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
      <View style={{flex: 1, width: '87%', alignSelf: 'center', gap: 15}}>
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
        <View
          style={{
            flex: 1,
          }}>
          <Animated.View style={styles.skeletonMainButton} />
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
    marginBottom: 20,
  },
  imagesContainer: {
    width: responsiveWidth(298),
    borderRadius: 12,
    overflow: 'hidden',
  },
  skeletonImage: {
    height: responsiveHeight(400),
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  skeletonTitle: {
    width: '60%',
    height: responsiveHeight(25),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  skeletonRating: {
    width: responsiveWidth(35),
    height: responsiveHeight(25),
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  line: {
    borderBottomWidth: 2,
    borderColor: COLORS.superLightGray,
  },
  socialMediaLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialMediaLinksInnerContainer: {
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
    width: responsiveWidth(50),
    height: responsiveHeight(25),
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  skeletonButton: {
    width: responsiveWidth(30),
    height: responsiveHeight(25),
    backgroundColor: '#E0E0E0',
    borderRadius: 11,
  },
  skeletonMainButton: {
    flex: 1,
    height: responsiveHeight(50),
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
});

export default SkeletonOffreCard;
