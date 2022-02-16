import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Image } from 'react-native-elements'
import { useToast } from 'react-native-toast-notifications'
import CameraRoll from "@react-native-community/cameraroll"
import axios from 'axios'
import { Button, Text } from 'react-native-elements'
import ScreenBox from './core/ScreenBox'

const Receipt = ({ data, callBack, navigation }) => {

  const toast = useToast()
  
  const handleDownload = () => {
    try {
      CameraRoll.save(data.image)
      toast.show("Saved Successfully", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        animationType: "zoom-in"
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = () => {
    navigation.navigate("EditReceipt", { data, callBack })
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/receipts/${data._id}`)
      .then(res => callBack())
      .catch(err => console.log(err));
  }

  return (
    <View style={styles.receiptContainer}>
      <View>
        <Image
          source={{ uri: data.image }}
          style={styles.logo}
        />
        <Text style={styles.price}>$ {data.totalAmount}</Text>
      </View>
      <View>
        <Button style={styles.btn} title="Download" type="outline" onPress={handleDownload} />
        <Button style={styles.btn} title="Edit" type="outline" onPress={handleEdit} />
        <Button title="Delete" type="outline" onPress={handleDelete} />
      </View>
    </View>
  )
}

const ExpenditureItem = ({ navigation, route }) => {
  const { job } = route.params
  const { name } = job
  const [receipts, setReceipts] = useState([])

  const getReceipts = () => {
    axios.get(`http://localhost:8000/api/receipts/all/${job._id}`)
      .then(res => {
        setReceipts(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getReceipts()
  }, [])

  return (
    <ScreenBox>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.totalPrice}>Total: ${receipts.reduce((a, v) => a = a + v.totalAmount, 0)}</Text>
      <Button style={styles.addBtn} title="Add Receipt" onPress={() => navigation.navigate('AddReceipt', { job, callback: getReceipts })} />
      {receipts.length > 0 ?
        receipts.map((item, index) => (
          <Receipt
            key={`rt-${index}`}
            data={item}
            navigation={navigation}
            callBack={getReceipts}
          />
        ))
      :
        <Text style={styles.noReceipts}>No Receipts</Text>
    }
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  addBtn: {
    marginBottom: 20,
  },
  receiptContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2288dd',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    width: 200,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    marginBottom: 10,
  },
  noReceipts: {
    textAlign: 'center',
    fontSize: 20,
  }
})

export default ExpenditureItem