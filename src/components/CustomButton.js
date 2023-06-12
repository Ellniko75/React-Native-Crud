import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const CustomButton = ({ onPress, icon, text, color = '#009688' }) => {
  return (
    <SafeAreaView>
      <View style={{ ...styles.containerButton, backgroundColor: color }}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <AntDesign name={icon} size={24} color="white" />
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default CustomButton

const styles = StyleSheet.create(
  {
    containerButton: {
      elevation: 8,
      borderRadius: 20,
      padding: 10,
      paddingLeft:25,
      width: 300,
      alignSelf: 'center'
    },
    buttonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase",
      position:'absolute',
      left:45
    },
    container:{
      height:40,
      justifyContent: 'center',
    },

  }

)