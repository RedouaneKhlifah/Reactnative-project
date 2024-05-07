import { FC } from "react";
import {Animated, FlatList, View , ImageSourcePropType, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Pagination from "./Pagination";
import { responsiveHeight, responsiveWidth } from "../../../utils/responsive";
import { Images } from "../../../constants";

export interface offreImagesDataT { 
  id : number,
  image : ImageSourcePropType
}


console.log("Images.restaurant");

console.log(Images.restaurant);


export const offreImagesData: offreImagesDataT[] = [
{
  id: 1,
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
const ImageComponent:FC<{data : offreImagesDataT}> = ({data}) =>{
  return (
      <Image style = {{width :responsiveWidth(298), height :responsiveHeight(282)}} source={data.image}/>
  )
}

const OfferImages = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event : any) => {
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

  const handleOnViewableItemsChanged = useRef(({viewableItems} :{viewableItems : any}) => {
    if (viewableItems.length > 0) { 
      setIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

    const renderItem = ({ item }: { item: offreImagesDataT }) => <ImageComponent data = {item}  />;


  return (
    <View>
      <FlatList
        data={offreImagesData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={offreImagesData} scrollX={scrollX} index={index} />
    </View>
  );
};

export default OfferImages;