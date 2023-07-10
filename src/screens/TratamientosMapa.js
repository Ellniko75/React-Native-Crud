import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps'
import UserContext from '../provider/Provider'
import { useContext } from 'react'
const TratamientosMapa = () => {

    const { state, dispatch } = useContext(UserContext)


    return (
        <View style={styles.container}>
            <MapView
                provider='google'
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: -32.522779,
                    longitude: -55.765835,
                    latitudeDelta: 6,
                    longitudeDelta: 6,
                }}

            >

                {
                    state.tratamientos.map((tratamiento) => (
                        <Marker
                            title={tratamiento.nombre}
                            coordinate={{ latitude: tratamiento.latitudZona, longitude: tratamiento.longitudZona }}
                        />
                    )
                    )
                }

            </MapView>
        </View>
    )
}

export default TratamientosMapa

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})