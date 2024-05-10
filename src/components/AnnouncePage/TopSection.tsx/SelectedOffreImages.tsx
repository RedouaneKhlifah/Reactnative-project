import {FC} from 'react';
import {
  Animated,
  FlatList,
  View,
  ImageSourcePropType,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {responsiveHeight, responsiveWidth} from '../../../utils/responsive';
import {IoffreImagesData} from '../../Home/BottomSection/OffreCard';
import ImagesPagination from '../../Home/BottomSection/ImagesPagination';
import {COLORS, SIZES} from '../../../constants';

export interface offreImagesDataT {
  id: number;
  image: ImageSourcePropType;
}

const ImageComponent: FC<{data: IoffreImagesData}> = ({data}) => {
  return (
    <Image
      style={{width: responsiveWidth(390), height: SIZES.height * 0.39}}
      source={data.image}
    />
  );
};

const SelectedOffreImages: FC<{data: IoffreImagesData[]}> = ({data}) => {
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
    ({viewableItems}: {viewableItems: any}) => {
      if (viewableItems.length > 0) {
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
        activeDotWidtch={8}
        activeDotBg={COLORS.yellow}
      />
    </View>
  );
};

export default SelectedOffreImages;
