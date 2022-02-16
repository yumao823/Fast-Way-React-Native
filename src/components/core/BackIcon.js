import React from "react"
import { TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons"

const BackIcon = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon
        name="chevron-back-outline"
        size={30}
        color="#2288dd"
      />
    </TouchableOpacity>
  )
}

export default BackIcon