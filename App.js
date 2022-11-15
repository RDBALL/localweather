import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import { API_KEY, CURRENT_WEATHER_API_URL } from '@env'
import CurrentWeather from './src/Components/CurrentWeather';
import background from './assets/bgimg.jpg'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)

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
      const currentWeatherAPIURL = `${CURRENT_WEATHER_API_URL}lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
      const currentWeatherURL = await fetch(currentWeatherAPIURL)
      const result = await currentWeatherURL.json()

      if (currentWeatherURL.ok) {
        setCurrentWeather(result)
      } else {
        console.log(result)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
          <CurrentWeather currentWeather={currentWeather} />
          <StatusBar style="light" />
        </ImageBackground>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
