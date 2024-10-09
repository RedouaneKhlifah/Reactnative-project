import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RnIcon from '../RnIcon';
import {COLORS} from '../../../constants';
import {useNavigationContext} from '../../../store/NavigationContext';

interface BackProps {
  onPress?: () => void;
  bgColor?: string;
  color?: string;
}

const BackButton: React.FC<BackProps> = ({
  onPress,
  bgColor = COLORS.white,
  color = COLORS.black,
}) => {
  const {goBack} = useNavigationContext();
  const setBackRoute = () => {
    goBack();
  };
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : setBackRoute}
      style={[styles.container, {backgroundColor: bgColor}]}>
      <RnIcon name="chevron-left" size={22} color={color} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    paddingVertical: 8,
    borderRadius: 10,
  },
});

export default BackButton;
