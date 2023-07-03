import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const CustomButton = ({ onPress, icon, text, color = '#009688', width = 300 }) => {
  const styles = StyleSheet.create(
    {
      containerButton: {
        elevation: 8,
        borderRadius: 20,
        padding: 10,
        width: width,
        alignSelf: 'center',

      },
      buttonText: {
        fontSize: 17,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      antDesign: {
        right: 20
      }

    }

  )
  {/*
Boton custom reutilizable
*/}
  return (
    <SafeAreaView>
      <View style={{ ...styles.containerButton, backgroundColor: color }}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            {
              icon && (
                <AntDesign name={icon} size={24} color="white" style={styles.antDesign} />
              )
            }
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default CustomButton

