// OffreCardV.js
import React, {FC} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import OffreCard, {IoffreCard} from '../Home/BottomSection/OffreCard';

const OffreCardV: FC<{data: IoffreCard[]}> = ({data}) => {
  const renderItem = ({item}: {item: IoffreCard}) => <OffreCard data={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure each item has a unique id
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default OffreCardV;
