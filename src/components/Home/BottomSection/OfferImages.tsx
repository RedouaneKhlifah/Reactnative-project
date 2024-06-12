import {FC} from 'react';
import {
  Animated,
  FlatList,
  View,
  ImageSourcePropType,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ImagesPagination from './ImagesPagination';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import {IoffreImagesData} from './OffreCard';

export interface offreImagesDataT {
  id: number;
  image: ImageSourcePropType;
}

const ImageComponent: FC<{data: IoffreImagesData}> = ({data}) => {
  return (
    <Image
      style={{width: responsiveWidth(298), height: responsiveHeight(400)}}
      source={data.image}
    />
  );
};

const OfferImages: FC<{data: IoffreImagesData[]}> = ({data}) => {
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

  const renderItem = ({item}: {item: IoffreImagesData}) => (
    <ImageComponent data={item} />
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        keyExtractor={item => item.id.toString()}
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
        activeDotWidtch={14}
        activeDotBg="#AB82FF"
      />
    </View>
  );
};

export default OfferImages;
