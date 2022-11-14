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
    <View style={styles.currentWeatherContainer}>
      <Image style={styles.icon} source={{ uri: iconURL }} />
      <Text style={styles.temperature}>{temp}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  currentWeatherContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 100
  }
});

export default CurrentWeather