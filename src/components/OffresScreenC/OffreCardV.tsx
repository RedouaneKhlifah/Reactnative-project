import React, {FC} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import OffreCard, {IoffreData} from '../Home/BottomSection/OffreCard';
import SkeletonOffreCard from '../Home/BottomSection/SkeletonOffreCard';

const OffreCardV: FC<{
  data: IoffreData[];
  loading: boolean;
  error: string | null;
}> = ({data, loading, error}) => {
  
  const renderItem = ({item}: {item: IoffreData}) => <OffreCard data={item} />;

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        {Array.from({length: 3}).map((_, index) => (
          <SkeletonOffreCard key={index} />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  skeletonContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default OffreCardV;
