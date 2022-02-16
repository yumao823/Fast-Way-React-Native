import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Avatar, Button, ListItem } from 'react-native-elements'
import axios from 'axios'
import ScreenBox from '../components/core/ScreenBox'

const AVATAR = 'https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder-300x300.png'

const Expenditure = ({ navigation }) => {

  const [jobSites, setJobSites] = useState([])
  
  const getJobSites = () => {
    axios.get(`http://localhost:8000/api/jobsites`)
      .then((res) => {
        setJobSites(res.data)
      })
      .catch((err) => console.log(err));
  }

  const handleDelete = id => {
    axios.delete(`http://localhost:8000/api/jobsites/${id}`)
      .then(res => res.data)
      .then(data => setJobSites(jobSites.filter(job => job._id !== id)))
      
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    getJobSites()
  }, []);

  return (
    <ScreenBox>
      <View style={styles.container}>
        <Button title="Create Job Site" onPress={() => navigation.navigate("CreateJobSite", { setJobSites, jobSites })} />
        <View style={styles.expendituresContainer}>
          {jobSites.map(item => (
            <TouchableOpacity key={`et-${item._id}`} onPress={() => navigation.navigate('ExpenditureItem', { job: item })}>
              <ListItem bottomDivider>
                <Avatar rounded source={{uri: AVATAR}} />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <Button title="Delete" onPress={() => handleDelete(item._id)}></Button>
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  expendituresContainer: {
    marginTop: 30,
  }
})

export default Expenditure