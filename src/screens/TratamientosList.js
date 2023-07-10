import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import UserContext from '../provider/Provider';
import Gradient from '../components/Gradient';

const TratamientosList = (props) => {
    const { state, dispatch } = useContext(UserContext)


    const getRightContent = (item) => {
        return (
            <View style={styles.rightButtons}>
                {/*Si clickea el botón de editar lo mandamos al InsumosForm y le envíamos de parámetro el Insumos que eligió editar*/}
                <TouchableOpacity onPress={() => props.navigation.navigate("TratamientosForm", item)}>
                    <MaterialCommunityIcons name="square-edit-outline" size={50} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert('Desea borrar el Tratamiento?', '', [
                    {
                        text: 'No',
                        onPress: () => console.log('Tratamiento no borrado'),
                        style: 'cancel',
                    },
                    { text: 'Si', onPress: () => dispatch({ type: "deleteTratamiento", payload: item }) },
                ])}>
                    <MaterialCommunityIcons name="delete-forever" size={50} color="#A41C1A" />
                </TouchableOpacity>

            </View>
        )
    }
    const buscarNombreYApellido = (ci) => {
        const user = state.users.find(user => user.ci == ci)
        if (user) {
            return user.nombre + " " + user.apellido
        }
        return "Usuario no encontrado"
    }
    const renderizarTratamientos = ({ item }) => {

        return (
            <ListItem.Swipeable
                key={item?.id}
                rightContent={getRightContent(item)} // Agrega aquí el contenido para el lado derecho
                rightStyle={styles.buttonContainer}
                bottomDivider
                style={styles.container}
            >
                <ListItem.Content>
                    <ListItem.Title>{"ID: " + item?.id}</ListItem.Title>
                    <ListItem.Title>{"Usuario: " + buscarNombreYApellido(item.ciUser)}</ListItem.Title>
                    <ListItem.Title>{"Fecha: " + item?.fechaInicio}</ListItem.Title>
                    <ListItem.Title>{item?.idObservacion ? "Tiene Observacion" : "No tiene observacion"}</ListItem.Title>
                </ListItem.Content>
            </ListItem.Swipeable>
        );
    };


    return (
        <View style={styles.backgroundView}>
            <Gradient texto={"Tratamientos"} colorAbajo='#5fb9ba' />
            <View>
                {state?.tratamientos?.length === 0 && (
                    <View style={styles.container}>
                        <Text style={styles.text}>No hay Tratamientos cargados</Text>
                    </View>

                )}
            </View>
            <FlatList
                data={state.tratamientos} renderItem={renderizarTratamientos}>
            </FlatList>
            <CustomButton text={'Ver Tratamientos en Mapa'} onPress={() => props.navigation.navigate('TratamientosMapa')} />
            <CustomButton onPress={() => props.navigation.navigate('TratamientosForm')} icon='pluscircleo' text='Agregar Tratamientos' />

        </View>
    )
}

export default TratamientosList

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        justifyContent: 'center',

    },
    rightButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
    }

})