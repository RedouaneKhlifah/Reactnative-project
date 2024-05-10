import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { FONTS, SIZES,COLORS } from '../../constants';

const Dropdown: React.FC<DropDownProps> = ({
        open,
        value,
        items,
        setOpen,
        setValue,
        setItems,
        placeholder,
        label,
        disableBorderRadius = false,
        maxHeight = 150,
        dropDownDirection = 'TOP',
        placeholderStyle,
        labelTextStyle
    }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
            placeholder={placeholder}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={true}
            maxHeight={120}
            dropDownDirection="AUTO"
            listMode="SCROLLVIEW"
            placeholderStyle={{
                color: '#d3d3d3',
                paddingHorizontal:0,
                ...FONTS.body5
            }}
            style={{
                minHeight:30,
                borderWidth:0,
                borderBottomWidth:2,
                borderRadius:0,
                borderColor:'#d3d3d3',
                backgroundColor:'#fafafa',
                paddingVertical:0,
            }}
            dropDownContainerStyle={{
                backgroundColor: "#dfdfdf"
            }}
        />
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
    label: {
      borderRadius: SIZES.middleRadius, 
      paddingHorizontal :5,
      flex : 1,
      ...FONTS.body3,
      fontSize: 16,
      fontWeight : "400",
    },
  });