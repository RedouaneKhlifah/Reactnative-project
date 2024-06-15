import {FC} from 'react';
import {Animated, FlatList, View, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {responsiveWidth} from '../../../utils/responsive';
import ImagesPagination from '../../Home/BottomSection/ImagesPagination';
import {COLORS, SIZES} from '../../../constants';

const ImageComponent: FC<{data: string}> = ({data}) => {
  return (
    <Image
      style={{width: responsiveWidth(390), height: SIZES.height * 0.39}}
      source={{uri: data}}
    />
  );
};

const SelectedOffreImages: FC<{data: string[]}> = ({data}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<{index: number | null}>}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({item}: {item: string}) => <ImageComponent data={item} />;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <ImagesPagination
        data={data}
        scrollX={scrollX}
        index={index}
        unactiveDotWidth={8}
        activeDotWidtch={8}
        activeDotBg={COLORS.yellow}
      />
    </View>
  );
};

export default SelectedOffreImages;
