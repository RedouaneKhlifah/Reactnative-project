import {StyleSheet, Animated, View, Dimensions} from 'react-native';
import React, {FC} from 'react';
import {offreImagesDataT} from './OfferImages';
import {SIZES} from '../../../constants';

const {width} = Dimensions.get('screen');

interface IPagination {
  data: offreImagesDataT[];
  scrollX: Animated.Value;
  index: number;
}

const ImagesPagination: FC<IPagination> = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 14, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', '#AB82FF', '#ccc'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor},
              idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default ImagesPagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: SIZES.fullRadius,
    marginHorizontal: 3,
    backgroundColor: 'red',
  },
  dotActive: {
    backgroundColor: '#AB82FF',
    width: 12,
    height: 12,
  },
});
