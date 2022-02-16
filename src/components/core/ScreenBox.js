import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const ScreenBox = ({ type = '', children }) => {
  return (
    <ScrollView style={styles.root}>
      <View style={type === 'center' && styles.container}>
        {children}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#ddd",
    minHeight: "100%",
  },
  container: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})

export default ScreenBox