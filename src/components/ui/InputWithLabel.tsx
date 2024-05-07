import { View, Text ,TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants';


interface props {
    labelText :string,
    placeholder : string,
}

const InputWithLabel:React.FC<props> = ({labelText,placeholder}) => {

  
  return (
    <View style  = {styles.container}>
      <Text style  = {styles.label}>{labelText}</Text>
      <TextInput style={styles.input} placeholder={`${placeholder}`}  placeholderTextColor={COLORS.grayHalfOpacity} />
    </View>
  )
}

const styles = StyleSheet.create({
    container : {

    },
    label  : {
        color :COLORS.darkGray,
        ...FONTS.body3,
        fontSize: 12,
        fontWeight : "400",
        paddingLeft : 3
    },
    input: {
      ...FONTS.body4,
      fontSize: 13,
      fontWeight : "400",
      color : COLORS.black,
      borderBottomWidth : 1,
      borderColor : COLORS.superLightGray,
      paddingVertical: 0, 
      paddingLeft : 3,
    },
  });
  
export default InputWithLabel