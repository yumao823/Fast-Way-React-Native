import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import axios from 'axios'
import ScreenBox from './core/ScreenBox'
import { MONTHS } from '../constants'

const TimeHistory = ({ navigation, route }) => {
  const { user } = route.params
  const [months, setMonths] = useState([])

  const handleMonth = data => {
    navigation.navigate('HistoryItem', { data })
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/time/${user._id}`)
    .then(res => {
      let removedDups = {};
        for (const thing of res.data) {
          removedDups[thing.month] = thing;
        }
        let data = [];
        for (let key in removedDups) {
          data.push(removedDups[key])
        }
        setMonths(data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <ScreenBox>
      <View>
        <Text h3 style={styles.title}>{user.name}</Text>
        {months.length > 0 ?
          months.map((item, index) => (
            <TouchableOpacity key={`mth-${index}`} onPress={() => handleMonth(item)} >
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{MONTHS[item.month]}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))
        :
          <Text style={styles.description}>No time has been logged</Text>
        }
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  description: {
    textAlign: 'center',
  }
})

export default TimeHistory