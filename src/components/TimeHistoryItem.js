import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Text, Button } from 'react-native-elements'
import axios from 'axios'
import ScreenBox from './core/ScreenBox'
import { MONTHS, DAYS, getNumberWithOrdinal } from '../constants'

const TimeHistoryItem = ({ route }) => {
  const { data } = route.params
  const { userId } = data
  const [times, setTimes] = useState([])
  const [totalTime, setTotalTime] = useState("")

  
  const calculateTotal = (allTimes) => {
    let tempHr = 0;
    let tempMin = 0;
    for (let { totalTime } of allTimes) {
      tempHr += parseInt(totalTime.substring(0, 2));
      tempMin += parseInt(totalTime.substring(3, 5));
      if (tempMin >= 60) {
        tempHr++;
        tempMin = Math.floor(tempMin / 60);
      }
    }
    return `Total: ${tempHr}Hr(s) ${tempMin}Min(s)`;
  }

  const handleDelete = id => {
    axios.delete(`http://localhost:8000/api/time/${id}`)
      .then(({ data }) => {
        let tempTimes = times.filter(time => time._id !== id);
        setTimes(tempTimes);
        setTotalTime( calculateTotal(tempTimes) );
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/time/${userId}`)
      .then(res => {
        let tempTimes = res.data.filter((time) => time.totalTime);
        setTimes(tempTimes);
        setTotalTime( calculateTotal(tempTimes) );
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <ScreenBox>
      <View>
        <Text h3 style={styles.title}>{MONTHS[data.month]}</Text>
        <Text style={styles.totalTime}>{totalTime}</Text>
        {times.map((time, index) => {
          return (
            <ListItem key={`ti=${index}`} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {DAYS[new Date(time.start).getDay()]},&nbsp;
                  {getNumberWithOrdinal(new Date(time.start).getDate())}&nbsp;
                  {time.totalTime.substring(0, 2) || "0"}Hr(s)&nbsp;
                  {time.totalTime.substring(3, 5) || "00"}Min(s)
                </ListItem.Title>
              </ListItem.Content>
              <Button title="Delete" onPress={() => handleDelete(time._id)}></Button>
            </ListItem>
          )
        })}
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  totalTime: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  }
})

export default TimeHistoryItem