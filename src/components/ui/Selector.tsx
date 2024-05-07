import { View, Text, TextInput, StyleSheet, Image ,Pressable } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import DatePicker from 'react-native-date-picker';
import { Icons } from '../../constants';

interface Props {
    labelText: string,
}

const Selector: React.FC<Props> = ({ labelText }) => {

    return (
        <View style={styles.container}>
            <Pressable onPress={()=>{
               console.log("test")
            }} style  =  {styles.inputContainer} >
            <Text style={styles.label}>{labelText}</Text>
            <View style  = {styles.arrowContainer}>  
                <Image   source={Icons.arrowDown}/> 
            </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    label: {
        color: COLORS.darkGray,
        ...FONTS.body3,
        fontSize: 13,
        fontWeight: "400",
        width : "90%",
        paddingLeft : 3
    },
    inputContainer : {
        borderBottomWidth: 1,
        borderColor: COLORS.superLightGray,
        flexDirection : "row",
    },
    arrowContainer : {
        width : "10%",
        justifyContent : "center" ,
        alignItems : "center",
    }

});

export default Selector;
