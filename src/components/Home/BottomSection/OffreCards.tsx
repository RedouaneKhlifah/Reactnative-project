/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {Animated, FlatList, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Images} from '../../../constants';
import OffreCard, {IoffreImagesData, IoffreData, IoffreCard} from './OffreCard';
import OffrePagination from './OffrePagination';

export const dummyData: IoffreData = {
  title: 'Example Title',
  location: 'Example Location',
  rating: 4.5,
  type: 'Example Type',
};

export const offreImagesData: IoffreImagesData[] = [
  {
    id: 1,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    image: Images.offreImage,
  },
  {
    id: 2,
    image: Images.testImage,
  },
  {
    id: 3,
    image: Images.offreImage,
  },
];

export const data = [
  {
    id: 1,
    offreImages: offreImagesData,
    offreData: dummyData,
  },
  {
    id: 2,
    offreImages: offreImagesData,
    offreData: dummyData,
  },
  {
    id: 3,
    offreImages: offreImagesData,
    offreData: dummyData,
  },
];

const OffreCards = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: unknown) => {
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
    ({viewableItems}: {viewableItems: unknown}) => {
      if (Array.isArray(viewableItems) && viewableItems.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setIndex(viewableItems[0] && viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({item}: {item: IoffreCard}) => <OffreCard data={item} />;

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
      <OffrePagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export default OffreCards;
