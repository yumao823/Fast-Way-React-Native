import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeAuth = async (auth) => {
  try {
    await AsyncStorage.setItem('auth', auth)
  } catch (e) {}
}

export const getAuth = async () => {
  try {
    const auth =  await AsyncStorage.getItem('auth')
    return JSON.parse(auth)
  } catch (e) {}
}

export const removeAuth = async () => {
  try {
    await AsyncStorage.removeItem('auth')
  } catch (e) {}
}