import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, View, Text, StyleSheet} from 'react-native';
import {CategoryCardT} from '../../../interfaces/bestOfferCardT';
import CategoryCard from './CategoryCard';
import SkeletonCard from './SkeletonCard';
import axiosConfig from '../../../api/axios.config';

const CategoryCards = () => {
  const [data, setData] = useState<CategoryCardT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClientWithToken = axiosConfig(true);
        const res = await apiClientWithToken.get('/categories/index');

        setData(res.data.business_categories);
        console.log('res', res.data.business_categories);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const renderItem = ({item}: {item: CategoryCardT}) => (
    <CategoryCard categoryData={item} />
  );

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        {Array.from({length: 3}).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={data}
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

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CategoryCards;
