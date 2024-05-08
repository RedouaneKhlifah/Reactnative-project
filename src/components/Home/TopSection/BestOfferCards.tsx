import {Animated, FlatList, View} from 'react-native';
import React, {useRef, useState} from 'react';
import BestOfferCard from './BestOfferCard';
import {bestOfferCardT} from '../../../interfaces/bestOfferCardT';
import {Images} from '../../../constants';

export const OffreData: bestOfferCardT[] = [
  {
    id: 1,
    title: 'Restaurant',
    image: Images.restaurant,
  },
  {
    id: 2,
    title: 'Hotel',
    image: Images.restaurant,
  },
  {
    id: 3,
    title: 'Restaurant',
    image: Images.restaurant,
  },
  {
    id: 4,
    title: 'Restaurant',
    image: Images.restaurant,
  },
  {
    id: 5,
    title: 'Restaurant',
    image: Images.restaurant,
  },
  {
    id: 6,
    title: 'Restaurant',
    image: Images.restaurant,
  },
];

const BestOfferCards = () => {
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
      setIndex(viewableItems[0].index);
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({item}: {item: bestOfferCardT}) => (
    <BestOfferCard OffreData={item} />
  );

  return (
    <View>
      <FlatList
        data={OffreData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
      />
    </View>
  );
};

export default BestOfferCards;
