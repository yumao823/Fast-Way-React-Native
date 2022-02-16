import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Stopwatch } from 'react-native-stopwatch-timer'

const StopWatch = () => {
  const [started, setStarted] = useState(false);
  const [reset, setReset] = useState(false);
  const [startTime, setStartTime] = useState()
  const [currTimeSheet, setCurrTimeSheet] = useState({});

  const auth = useSelector(state => state.state.auth)
  const { userId } = auth

  useEffect(() => {
    axios.get(`http://localhost:8000/api/time/${userId}`)
      .then(res => {
        let allTimeSheets = res.data || [];
        allTimeSheets = allTimeSheets.filter((timeSheet) => !timeSheet.totalTime)
        if (allTimeSheets.length > 0) {
          let ms = new Date() - new Date(allTimeSheets[0].start);
          setStartTime(ms)
          setCurrTimeSheet(allTimeSheets[0])
          setStarted(true)
          setReset(false)
        } else {
          setStartTime(0)
        }
      })
      .catch(err => {console.log(err); setStartTime("0") })

  }, [])

  const handleShift = () => {
    if (started) {
      let endDate = new Date();
      setStarted(false)
      setReset(true)
      setStartTime(0)
      let totalms = endDate - new Date(currTimeSheet.start);
      const payload = {
        totalTime: new Date(totalms).toISOString().substr(11, 8),
        end: endDate,
      }
      axios.put(
        `http://localhost:8000/api/time/${currTimeSheet._id}`,
        payload
      )
        .then(res => setCurrTimeSheet({}))
        .catch(err => console.log(err))

    } else {
      let startDate = new Date();
      setStarted(true)
      setReset(false)
      setStartTime(0)

      const payload = {
        userId,
        start: startDate,
        month: startDate.getMonth(),
      }
      axios.post(
        "http://localhost:8000/api/time",
        payload
      )
        .then(res => setCurrTimeSheet(res.data))
        .catch(err => console.log(err))

    }
  }

  return (
    <View>
      <Button
        title={started ? 'Stop Shift' : 'Start Shift'}
        onPress={handleShift}
      />
      {
        startTime > -1 &&
        <Stopwatch
          start={started}
          options={options}
          reset={reset}
          startTime={startTime}
        />
      }
    </View>
  )
}

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 20,
    alignItems: 'center',
    marginVertical: 25,
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};

export default StopWatch