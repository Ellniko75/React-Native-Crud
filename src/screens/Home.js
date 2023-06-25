import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect } from 'react'
import CustomButton from '../components/CustomButton'
import { BackgroundImage } from 'react-native-elements/dist/config'



const Home = (props) => {
  return (

    <BackgroundImage source={require('../Images/black.jpg')} style={styles.imageBackground}>
      <View style={styles.container}>

        <CustomButton onPress={() => { props.navigation.navigate("UsersList") }} icon="user" text="usuarios" color="#a33a5d" />
        <CustomButton onPress={() => { props.navigation.navigate("ZoneList") }} icon="rest" text="zonas" color="#ff6c00" />
        <CustomButton onPress={() => { props.navigation.navigate("InsumosList") }} icon="filter" text="Insumos" color="#CB57F0" />
        <CustomButton onPress={() => { props.navigation.navigate("ObservacionesList") }} icon="filter" text="Observaciones" color="#097969" />

      </View >
    </BackgroundImage>


  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1
  }
}

)