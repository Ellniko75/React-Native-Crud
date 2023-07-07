import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useContext } from 'react'
import CustomButton from '../components/CustomButton'
import UserContext from '../provider/Provider'
import Chooser from '../components/Chooser'
import { Picker } from '@react-native-picker/picker';
import DatePicker from '../components/DatePicker'
import { Image } from 'react-native-elements'
import ImagePickerDefault from '../components/ImagePickerDefault'

const TratamientosForm = (props) => {
    const tratamientoPorParametro = props?.route?.params

    const { state, dispatch } = useContext(UserContext)

    const [id, setId] = useState(tratamientoPorParametro ? tratamientoPorParametro.id.toString() : "");
    const [nombre, setNombre] = useState(tratamientoPorParametro ? tratamientoPorParametro.nombre : "");
    const [zona, setZona] = useState(tratamientoPorParametro ? { latitudZona: tratamientoPorParametro.latitudZona, longitudZona: tratamientoPorParametro.longitudZona }
        : {
            latitudZona: null,
            longitudZona: null
        })
    const [ciUser, setCiUser] = useState(tratamientoPorParametro ? tratamientoPorParametro.ciUser.toString() : "");
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [img, setImg] = useState(tratamientoPorParametro ? tratamientoPorParametro.img : null);
    const [tiempo, setTiempo] = useState(tratamientoPorParametro ? tratamientoPorParametro.tiempo.toString() : "");
    const [idInsumo, setIdInsumo] = useState(tratamientoPorParametro ? tratamientoPorParametro.idInsumo.toString() : "");
    const [idObservacion, setIdObservacion] = useState(tratamientoPorParametro ? tratamientoPorParametro.idObservacion : null); const [imagenObs, setImagenObs] = useState(tratamientoPorParametro ? tratamientoPorParametro.idObservacion.toString() : "");

    const inputsAreValid = () => {
        if (id != null && nombre != "" && zona.latitudZona != null && ciUser != null && img != null && tiempo != null && idInsumo != null) {
            return true;
        } return false
    }
    const crearTratamiento = () => {
        return {
            id: id,
            nombre: nombre,
            latitudZona: zona.latitudZona,
            longitudZona: zona.longitudZona,
            ciUser: ciUser,
            fechaInicio: fechaInicio.toString(),
            fechaFin: fechaFin.toString(),
            tiempo: tiempo,
            img: img,
            idInsumo: idInsumo,
            idObservacion: idObservacion
        }
    }

    const renderItemZona = (item) => {
        return (
            <Picker.Item label={item.latitud + " " + item.longitud}
                value={{ latitudZona: item.latitud, longitudZona: item.longitud }}
                key={{ latitudZona: item.latitud, longitudZona: item.longitud }} />
        )
    }
    const renderItemUsuario = (item) => {
        return (
            <Picker.Item label={item.nombre + " " + item.apellido} value={item.ci} key={item.ci} />
        )
    }
    const renderizarInsumos = (insumo) => {
        return (
            <Picker.Item label={insumo.nombre} value={insumo.id.toString()} key={insumo.id.toString()} />
        )
    }
    const renderizarObservaciones = (observacion) => {
        return (
            <Picker.Item label={observacion.titulo} value={observacion.id} key={observacion.id} />
        )
    }


    const guardarEstadoZona = (estado) => {
        setZona(estado)
    }
    const guardarEstadoUsuario = (usuarioCi) => {
        setCiUser(usuarioCi)
    }
    const guardarEstadoFechaInicio = (fecha) => {
        setFechaInicio(fecha)
    }
    const guardarEstadoFechaFin = (fecha) => {
        setFechaFin(fecha)
    }
    const guardarEstadoInsumos = (id) => {
        setIdInsumo(id)
    }
    const guardarEstadoObservaciones = (id) => {
        setIdObservacion(id)
    }
    const guardarEstadoImagen = (img) => {
        setImg(img)
    }


    useEffect(() => {
        const imagen = state.observaciones.map((obs) => {
            if (obs.id == idObservacion) {
                return obs.img
            }
        })
        setImagenObs(imagen[0])
    }, [idObservacion])



    const handlePressAddOrModify = () => {
        if (inputsAreValid()) {
            if (!tratamientoPorParametro) {
                const tratamiento = crearTratamiento();
                dispatch({ type: 'addTratamiento', payload: tratamiento })
                props.navigation.navigate("TratamientosList");
            } else {
                const tratamiento = crearTratamiento();
                dispatch({ type: 'modifyTratamiento', payload: tratamiento })
                props.navigation.navigate("TratamientosList");
            }

        } else {
            Alert.alert("Error", "Faltan datos")
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, marginTop: -24 }}>
            <ScrollView style={styles.scrollable}>
                <View>
                    <Text style={styles.TitleHeader}>Tratamientos</Text>
                </View>
                <View style={styles.Form}>
                    {
                        !tratamientoPorParametro && (<>
                            <Text style={styles.center}>Id</Text>
                            <TextInput
                                maxLength={30}
                                value={id}
                                onChangeText={(id) => { setId(id) }}
                                placeholder={id}
                                style={styles.input}
                                keyboardType='numeric'
                            />
                        </>
                        )
                    }

                    <Text style={styles.center}>Nombre</Text>
                    <TextInput
                        maxLength={30}
                        value={nombre}
                        onChangeText={(nombre) => { setNombre(nombre) }}
                        placeholder={nombre}
                        style={styles.input}
                    />
                    <Text style={styles.center}>Horas</Text>
                    <TextInput
                        maxLength={30}
                        value={tiempo}
                        onChangeText={(tiempo) => { setTiempo(tiempo) }}
                        placeholder={tiempo}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Chooser etiqueta={"Zona"} valorInicial={zona} listaDesplegables={state.zones} renderizarItem={renderItemZona} guardarEstado={guardarEstadoZona} />
                    <Chooser etiqueta={"Usuario"} valorInicial={ciUser} listaDesplegables={state.users} renderizarItem={renderItemUsuario} guardarEstado={guardarEstadoUsuario} />
                    <Chooser etiqueta={"Insumo"} valorInicial={idInsumo} listaDesplegables={state.insumos} guardarEstado={guardarEstadoInsumos} renderizarItem={renderizarInsumos} />
                    <Chooser etiqueta={"Observacion"} valorInicial={idObservacion} listaDesplegables={state.observaciones} guardarEstado={guardarEstadoObservaciones} renderizarItem={renderizarObservaciones} />
                    {
                        imagenObs && (
                            <View style={styles.observacionImagenContainer}>
                                <Image source={{ uri: imagenObs }} style={{ width: 100, height: 100 }} />
                            </View>
                        )
                    }

                    <DatePicker titulo={"Elegir fecha Inicio"} guardarEstado={guardarEstadoFechaInicio} fecha={fechaInicio} mode="date" dateFormat="day month year" />
                    <DatePicker titulo={"Elegir fecha fin"} guardarEstado={guardarEstadoFechaFin} fecha={fechaFin} mode="date" dateFormat="day month year" />


                    <ImagePickerDefault callback={guardarEstadoImagen} />
                    {img &&
                        <View style={styles.observacionImagenContainer}>
                            <Image source={{ uri: img }} style={{ width: 100, height: 100 }} />
                        </View>

                    }
                    {/*En el boton, para el texto nos fijamos si recibió parámetros o no, de esa forma sabemos si entró a "Agregar Tratamiento" o a "Editar"*/}
                    <CustomButton onPress={handlePressAddOrModify} icon={tratamientoPorParametro ? "edit" : "pluscircleo"} text={tratamientoPorParametro ? "Editar" : "Agregar Insumos"} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default TratamientosForm

const styles = StyleSheet.create({
    scrollable: {
        flex: 1
    },
    botonesFechaContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
    },
    center: {
        fontSize: 20
    },
    Form: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
    },
    TitleHeader: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: '#a33a5d',
        borderBottomRightRadius: 70,
        marginBottom: 20
    },
    observacionImagenContainer: {
        padding: 12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});