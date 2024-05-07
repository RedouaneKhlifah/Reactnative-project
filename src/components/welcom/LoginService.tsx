import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { appTheme } from '../../constants'
import { Icons } from '../../constants'

const { SIZES, COLORS, FONTS } = appTheme

const LoginService: React.FC<{ title: string, Icon: React.FC }> = ({ title, Icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Innercontainer}>
        <View style = {styles.icon} >
              <Icon />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent : "center",

    flex :1,
  },
  Innercontainer : {
    flexDirection: "row",
    alignItems: "center",
    justifyContent : "center",
    height :"75%",
    borderWidth: 1,
    borderRadius: SIZES.fullRadius,
    borderColor: COLORS.lightGray,
  }
  ,
  icon: {
    position : "absolute",
    left: 20,
  },
  text: {
    alignSelf : "center",
    ...FONTS.body2,
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    textTransform: "capitalize"
  },
})

export default LoginService
