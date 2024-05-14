import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { FONTS, SIZES,COLORS } from '../../constants';
import RnIcon from './RnIcon';

const Dropdown: React.FC<DropDownProps> = ({
        value,
        items,
        setValue,
        setItems,
        placeholder,
        label,
        disableBorderRadius = false,
        maxHeight = 120,
        dropDownDirection = 'TOP',
        placeholderStyle,
        labelTextStyle,
        multiple = false,
        onSelectItem
    }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
            multiple={multiple}
            placeholder={placeholder}
            open={isOpen}
            value={value}
            items={items}
            setOpen={setIsOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={true}
            maxHeight={maxHeight}
            dropDownDirection={dropDownDirection}
            onSelectItem={onSelectItem}
            listMode="SCROLLVIEW"
            mode="BADGE"
            placeholderStyle={{
                color: '#d3d3d3',
                paddingHorizontal:0,
                ...FONTS.body5
            }}
            arrowIconStyle={{
              width:16,
              height:16
            }}
            style={{
                minHeight:30,
                borderWidth:0,
                borderBottomWidth:1.8,
                borderRadius:0,
                borderColor:'#ebebeb',
                backgroundColor:'#fafafa',
                paddingVertical:0,
            }}
            dropDownContainerStyle={{
                backgroundColor: "white",
                borderWidth:0,
                borderRadius:0,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4.84,
                elevation: 1.5
            }}
            labelStyle={labelTextStyle}
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
      margin:0,
      paddingVertical:0
    },
  });