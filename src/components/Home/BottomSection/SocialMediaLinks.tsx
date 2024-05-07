import { View, Text, Pressable } from 'react-native'
import React, { Children, FC } from 'react'
import { COLORS } from '../../../constants'

const SocialMediaLinks:FC<{Icon : FC}> = ({Icon}) => {
  return (
    <Pressable style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },{backgroundColor : COLORS.LightGray2 , padding : 3 , borderRadius : 5 }
      ]}>
        
        <Icon/>
    </Pressable>
  )
}

export default SocialMediaLinks