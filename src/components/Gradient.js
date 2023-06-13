import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';

const Gradient = ({colorAbajo='#a33a5d',texto}) => {
  return (
    <LinearGradient
    colors={['#4F17F0',colorAbajo]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 0.3 }}
    style={styles.container}
    >
    <Text style={styles.title}>{texto}</Text>
  </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        borderBottomRightRadius: 70,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
      },
      title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
      },
})



export default Gradient

