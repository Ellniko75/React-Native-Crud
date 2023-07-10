import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'

{/*
Este componente se encarga mostrar un mapa con un marker en un lugar especifico.

lat=>latitud Opcional
long=>longitud Opcional
updateParentState=>Callback que actualiza el componente padre


######IMPORTANTE######
En caso de que el usuario eliga Agregar una nueva zona, a este componente le llegará lat=0 y long=0,
en tal caso la funcion fetchLocalization() se encargará de pedir al usuario mediante GPS su localización actual y usarla para
mostrar el marker del mapa en esa posición
*/}

const MapWithMarker = ({ lat, long, updateParentState, disableChange }) => {
  const [latitud, setLatitud] = useState(lat)
  const [longitud, setLongitud] = useState(long)

  const fetchLocalization = async () => {
    if (!lat || !long) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Error")
        return;
      }

      let localizacion = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = localizacion.coords
      setLatitud(latitude);
      setLongitud(longitude);
      updateParentState(latitude, longitude);
    }
  }

  const handleMapPress = (event) => {
    if (!disableChange) {
      let latitude = event.nativeEvent.coordinate.latitude
      let longitude = event.nativeEvent.coordinate.longitude
      setLatitud(latitude);
      setLongitud(longitude);
      updateParentState(latitude, longitude);
    }

  }

  useEffect(() => {
    fetchLocalization();
  }, [])


  const map = useRef();
  useEffect(() => {
    map.current?.animateToRegion({
      latitude: latitud,
      longitude: longitud,
      longitudeDelta: 0.005,
      latitudeDelta: 0.005,
    });
  }, [latitud, longitud])


  return (
    <View style={styles.container}>
      <MapView
        provider='google'
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitud,
          longitude: longitud,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        onPress={handleMapPress}
        ref={map}
      >
        <Marker
          title='Posicion Elegida'
          coordinate={{ latitude: latitud, longitude: longitud }}
        />
      </MapView>
    </View>
  )
}

export default MapWithMarker

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})