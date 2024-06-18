import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import React, {FC} from 'react';
import {SIZES} from '../../../constants';
const {width} = Dimensions.get('screen');

interface IPagination {
  data: string[];
  scrollX: Animated.Value;
  index: number;
  unactiveDotWidth: number;
  activeDotWidtch: number;
  activeDotBg: string;
}

const ImagesPagination: FC<IPagination> = ({
  data,
  scrollX,
  index,
  unactiveDotWidth,
  activeDotWidtch,
  activeDotBg,
}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [unactiveDotWidth, activeDotWidtch, unactiveDotWidth],
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
              {width: unactiveDotWidth, height: unactiveDotWidth},
              {width: dotWidth, backgroundColor},
              idx === index && {
                backgroundColor: activeDotBg,
                width: activeDotWidtch,
                height: activeDotWidtch,
              },
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
    borderRadius: SIZES.fullRadius,
    marginHorizontal: 3,
  },
});
