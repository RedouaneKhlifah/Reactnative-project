import React from 'react'
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const RnIcon: React.FC<IconProps> = ({name,size,color,bgColor,width,height})=>{
  return (
    <View style={[styles.container, { backgroundColor: bgColor ,width:width ?? size ,height:height ?? size ?? 15}]}>
      <Icon name={name} size={size ?? 15} color={color ?? 'black'}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    display:'flex',
    borderRadius: 15,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default RnIcon;
