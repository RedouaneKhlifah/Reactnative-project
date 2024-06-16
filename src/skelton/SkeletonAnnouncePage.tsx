import React, {FC} from 'react';
import {View, Text, StyleSheet, Animated, ScrollView} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {responsiveWidth, responsiveHeight} from '../utils/responsive';
import BackButton from '../components/ui/buttons/BackButton';

const SkeletonAnnouncePage: FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageSkeleton}>
        <View style={{marginTop: 20, marginLeft: 15}}>
          <BackButton color="white" bgColor="#fad932" />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Animated.View style={styles.titleSkeleton} />
          <Animated.View style={styles.ratingSkeleton} />
        </View>
        <View style={styles.line} />
        <View style={styles.section}>
          <Animated.View style={styles.labelSkeleton} />
          <Animated.View style={styles.textSkeleton} />
          <Animated.View style={styles.textSkeleton} />
        </View>
        <View style={styles.section}>
          <Animated.View style={styles.labelSkeleton} />
          <Animated.View style={styles.dateInputSkeleton} />
          <Animated.View style={styles.timeInputSkeleton} />
          <Animated.View style={styles.inputSkeleton} />
          <Animated.View style={styles.inputSkeleton} />
          <Animated.View style={styles.buttonSkeleton} />
        </View>
        <Animated.View style={styles.sectionLabelSkeleton} />
        <View style={styles.similairesContainer}>
          {Array.from({length: 4}).map((_, index) => (
            <Animated.View key={index} style={styles.similaireSkeleton} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  imageSkeleton: {
    width: '100%',
    height: SIZES.height * 0.39,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 20,
  },
  content: {
    gap: 22,
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSkeleton: {
    width: '60%',
    height: responsiveHeight(30),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  ratingSkeleton: {
    width: responsiveWidth(50),
    height: responsiveHeight(30),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: COLORS.superLightGray,
    marginVertical: 10,
  },
  section: {
    gap: 15,
  },
  labelSkeleton: {
    width: '40%',
    height: responsiveHeight(20),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  textSkeleton: {
    width: '100%',
    height: responsiveHeight(20),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 5,
  },
  dateInputSkeleton: {
    width: '45%',
    height: responsiveHeight(40),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  timeInputSkeleton: {
    width: '45%',
    height: responsiveHeight(40),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  inputSkeleton: {
    width: '100%',
    height: responsiveHeight(40),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonSkeleton: {
    width: '100%',
    height: responsiveHeight(40),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 15,
  },
  sectionLabelSkeleton: {
    width: '60%',
    height: responsiveHeight(25),
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 15,
  },
  similairesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  similaireSkeleton: {
    width: '48%',
    height: responsiveHeight(150),
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
});

export default SkeletonAnnouncePage;
