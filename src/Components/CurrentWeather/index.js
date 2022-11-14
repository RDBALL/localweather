import { Image, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { ICON_URL } from '@env'

function CurrentWeather({ currentWeather }) {
  const {
    main: { temp },
    weather: [details]
  } = currentWeather

  const { icon, description } = details
  const iconURL = `${ICON_URL}${icon}@2x.png`


  return (
    <View style={[styles.currentWeatherContainer, styles.shadowProp]}>
      <View style={styles.currentWeather}>
        <Image style={styles.icon} source={{ uri: iconURL }} />
        <Text style={styles.temperature}>{Math.round(temp)}° f</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  currentWeatherContainer: {
    flex: 1,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentWeather: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'rgba(194, 187, 191, 0.15)',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
  temperature: {
    fontSize: 50,
    color: '#fff',
  },
  description: {
    fontSize: 35,
    color: '#fff',
  },
  icon: {
    width: 100,
    height: 100,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
});

export default CurrentWeather