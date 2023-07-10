import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import UserContext from '../provider/Provider';
import Gradient from '../components/Gradient';

const InsumosList = (props) => {

    const { state, dispatch } = useContext(UserContext)

    const handleDelete = (item) => {
        let inUse = false;
        state.tratamientos.forEach(trat => {
            if (trat.idInsumo == item.id) {
                Alert.alert("Error", "El insumo está siendo usado en un tratamiento")
                inUse = true
                return
            }
        })
        if (!inUse) dispatch({ type: "deleteInsumos", payload: item })
    }

    const getRightContent = (item) => {
        return (
            <View style={styles.rightButtons}>
                {/*Si clickea el botón de editar lo mandamos al InsumosForm y le envíamos de parámetro el Insumos que eligió editar*/}
                <TouchableOpacity onPress={() => props.navigation.navigate("InsumosForm", item)}>
                    <MaterialCommunityIcons name="square-edit-outline" size={50} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert('Desea borrar el Insumos?', '', [
                    {
                        text: 'No',
                        onPress: () => console.log('Insumos no borrado'),
                        style: 'cancel',
                    },
                    { text: 'Si', onPress: () => handleDelete(item) },
                ])}>
                    <MaterialCommunityIcons name="delete-forever" size={50} color="#A41C1A" />
                </TouchableOpacity>

            </View>
        )
    }

    const renderizarInsumos = ({ item }) => {
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
                    <ListItem.Title>{"Nombre: " + item?.nombre}</ListItem.Title>
                    <ListItem.Title>{"Cantidad: " + item?.cantidad}</ListItem.Title>
                </ListItem.Content>
            </ListItem.Swipeable>
        );
    };


    return (
        <View style={styles.backgroundView}>
            <Gradient texto={"Insumos"} colorAbajo='#CB57F0' />
            <View>
                {state?.users?.length === 0 && (
                    <View style={styles.container}>
                        <Text style={styles.text}>No hay Insumos cargados</Text>
                    </View>

                )}
            </View>
            <FlatList
                data={state.insumos} renderItem={renderizarInsumos}>
            </FlatList>
            <CustomButton onPress={() => props.navigation.navigate('InsumosForm')} icon='pluscircleo' text='Agregar Insumos' />

        </View>
    )

}

export default InsumosList

const styles = StyleSheet.create({
    container: {
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