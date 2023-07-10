import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import ImagePickerDefault from '../components/ImagePickerDefault'
import { useState, useContext } from 'react'
import Chooser from '../components/Chooser'
import MapWithMarker from '../components/MapWithMarker'
import CustomButton from '../components/CustomButton'
import UserContext from '../provider/Provider'
import { Image } from 'react-native-elements'
import Gradient from '../components/Gradient'
const ObservacionesForm = (props) => {
    const { state, dispatch } = useContext(UserContext)

    const ObservacionPorParametro = props?.route?.params

    const [image, setImage] = useState(ObservacionPorParametro?.img);
    const [titulo, setTitulo] = useState(ObservacionPorParametro?.titulo);
    const [latitud, setLatitud] = useState(ObservacionPorParametro?.latitud);
    const [longitud, setLongitud] = useState(ObservacionPorParametro?.longitud);

    const callbackSetImage = (imageURI) => {
        setImage(imageURI);
    }
    const callbackSetTitulo = (Ptitulo) => {
        setTitulo(Ptitulo)
    }
    const callbackSetLatYLong = (lat, long) => {
        setLatitud(lat);
        setLongitud(long);
    }

    const inputsAreValid = () => {
        if (image != null && titulo != null && latitud != null && longitud != null) {
            return true
        } else {
            Alert.alert("Error", "Faltan datos")
            return false
        }
    }
    const crearObservacion = () => {
        return {
            id: Date.now(),
            titulo: titulo,
            latitud: latitud,
            longitud: longitud,
            img: image
        }
    }
    const handleClick = () => {
        if (ObservacionPorParametro) {
            if (inputsAreValid()) {
                let observacionModificada = crearObservacion();
                observacionModificada.id = ObservacionPorParametro.id
                dispatch({
                    type: 'editObservacion',
                    payload: observacionModificada
                })
                props.navigation.navigate("ObservacionesList");
            }
        } else {
            if (inputsAreValid()) {
                let observacion = crearObservacion()
                dispatch({
                    type: 'addObservacion',
                    payload: observacion
                })
                props.navigation.navigate("ObservacionesList");
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.TitleHeader}>Observacion</Text>
            <Chooser valorInicial={titulo ? titulo : "Eliga un Titulo"} etiqueta={"Eliga un Titulo"} guardarEstado={callbackSetTitulo} listaDesplegables={["Plaga detectada", "Planta en mal estado", " Falta de riego"]} />
            <View style={styles.flexContainer}>
                <ImagePickerDefault callback={callbackSetImage} />
                {image && <Image source={{ uri: image }} style={{ marginLeft: '20%', width: 200, height: 200, margin: 5 }} />}
                <View style={styles.map}>
                    <MapWithMarker lat={latitud ? latitud : 0} long={longitud ? longitud : 0} updateParentState={callbackSetLatYLong} disableChange={ObservacionPorParametro ? true : false} />
                </View>
            </View>
            <CustomButton onPress={handleClick} text={props?.route?.params ? "Editar Observacion" : "Agregar Observacion"} icon={props?.route?.params ? "edit" : "pluscircleo"} />
        </View>
    )
}

export default ObservacionesForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexContainer: {
        flex: 1,

    },
    map: {
        height: '100%',
    },
    TitleHeader: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: '#097969',
        borderBottomRightRadius: 70,
        marginBottom: 20
    },
})