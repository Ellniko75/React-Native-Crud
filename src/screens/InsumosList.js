import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import UserContext from '../provider/Provider';


const InsumosList = (props) => {

    const { state, dispatch } = useContext(UserContext)


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
                    { text: 'Si', onPress: () => dispatch({ type: "deleteInsumos", payload: item }) },
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
            <View>
                <Text style={styles.TitleHeader}>Insumos</Text>
            </View>
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
    TitleHeader: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: '#CB57F0',
        borderBottomRightRadius: 70
    },
    rightButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
    }

})