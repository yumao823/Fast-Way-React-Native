
import React from "react"
import { TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons"

const PlusIcon = ({ callBack }) => {

    return (
        <TouchableOpacity onPress={callBack}>
            <Icon
                name="add-outline"
                size={30}
                color="#2288dd"
            />
        </TouchableOpacity>
    )
}

export default PlusIcon;