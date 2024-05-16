import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RnIcon from '../RnIcon'
import { COLORS } from '../../../constants';

interface BackProps {
    onPress?: () => void;
    bgColor?:string;
    color?:string
  }

const BackButton : React.FC<BackProps> = ({onPress,bgColor=COLORS.white,color=COLORS.black}) => {
  return (    
  <TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor:bgColor}]}>
    <RnIcon name='chevron-left' size={24} color={color}/>
  </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:33,
        height:33,
        paddingVertical:8,
        borderRadius:10
    }
})

export default BackButton