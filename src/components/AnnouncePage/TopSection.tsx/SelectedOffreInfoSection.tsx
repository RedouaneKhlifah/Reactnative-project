import {View, Text} from 'react-native';
import React from 'react';
import OffreInfo from '../../Home/BottomSection/OffreInfo';
import {Icons} from '../../../constants';

const SelectedOffreInfoSection = () => {
  return (
    <View>
      <OffreInfo title="Sambara" location="Tetouan, MA" iconSize={18} />
    </View>
  );
};

export default SelectedOffreInfoSection;
