import React from "react"
import { StyleSheet } from "react-native"
import { Button } from 'react-native-elements'
import { useDispatch } from "react-redux"

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_SUCCESS'})
  }

  return (
    <Button
      style={styles.logout}
      type="outline"
      title="Log Out"
      onPress={handleLogout}
    />
  )
}

const styles = StyleSheet.create({
  logout: {
    width: 100,
    marginRight: 10,
  }
})

export default Logout