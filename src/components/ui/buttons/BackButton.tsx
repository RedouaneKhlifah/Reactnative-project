import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RnIcon from '../RnIcon'
import { COLORS } from '../../../constants';

interface BackProps {
    onPress: () => void;
  }

const BackButton : React.FC<BackProps> = ({onPress}) => {
  return (    
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <RnIcon name='chevron-left' size={24}/>
  </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.white,
        width:33,
        height:33,
        paddingVertical:8,
        borderRadius:10
    }
})

export default BackButton