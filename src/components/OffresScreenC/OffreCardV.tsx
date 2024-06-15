// OffreCardV.js
import React, {FC} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import OffreCard, {IoffreData} from '../Home/BottomSection/OffreCard';

const OffreCardV: FC<{data: IoffreData[]}> = ({data}) => {
  const renderItem = ({item}: {item: IoffreData}) => <OffreCard data={item} />;

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
});

export default OffreCardV;
