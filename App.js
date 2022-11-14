import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import { API_KEY, API_URL } from '@env'

// require('@env').config()

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitMeasurements, setUnitMeasurements] = useState('imperial')

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage('Location access needed to retrieve your local weather')
        return
      }
      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords
      const apiURL = `${API_URL}lat=${latitude}&lon=${longitude}&units=${unitMeasurements}&appid=${API_KEY}`
      const response = await fetch(apiURL)
      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        console.log(result)
      }
      // alert(`Latitude : ${latitude}, Longitude: ${longitude}`)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  if (currentWeather) {
    const { main: { temp } } = currentWeather
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{temp}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto" />
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
  }
});
