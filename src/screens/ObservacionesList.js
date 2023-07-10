import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useContext } from 'react'
import UserContext from '../provider/Provider'
import Gradient from '../components/Gradient'
import { FlatList } from 'react-native-gesture-handler'
import CustomButton from '../components/CustomButton'
import { ListItem } from 'react-native-elements'
import ListItemSwipeable from 'react-native-elements/dist/list/ListItemSwipeable'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native-elements'

const ObservacionesList = (props) => {

    const { state, dispatch } = useContext(UserContext)


    const getRightContent = (item) => {
        return (
            <View style={styles.rightButtons}>
                {/*Si clickea el botón de editar lo mandamos al UserForm y le envíamos de parámetro el usuario que eligió editar*/}
                <TouchableOpacity onPress={() => props.navigation.navigate("ObservacionesForm", item)}>
                    <MaterialCommunityIcons name="square-edit-outline" size={50} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert('Desea borrar la Observacion?', '', [
                    {
                        text: 'No',
                        onPress: () => console.log('Observacion no borrada'),
                        style: 'cancel',
                    },
                    { text: 'Si', onPress: () => dispatch({ type: "deleteObservacion", payload: item }) },
                ])}>
                    <MaterialCommunityIcons name="delete-forever" size={50} color="#A41C1A" />
                </TouchableOpacity>

            </View>
        )
    }


    const renderizarObservaciones = ({ item }) => {
        return (
            <ListItem.Swipeable
                key={item?.id}
                rightContent={getRightContent(item)} // Agrega aquí el contenido para el lado derecho
                rightStyle={styles.buttonContainer}
                bottomDivider
                style={styles.container}
            >
                <ListItem.Content style={styles.container}>
                    <View style={{ marginRight: 50 }}>
                        {
                            item.img
                                ?
                                <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
                                :
                                <MaterialCommunityIcons name="file-image" size={24} color="black" />
                        }
                    </View>
                    <View>
                        <ListItem.Title>{item?.titulo}</ListItem.Title>
                        <ListItem.Subtitle>{"lat: " + item?.latitud}</ListItem.Subtitle>
                        <ListItem.Subtitle>{"long: " + item?.longitud}</ListItem.Subtitle>
                    </View>
                </ListItem.Content>
            </ListItem.Swipeable>
        );
    };

    return (
        <View style={styles.backgroundView}>
            <Gradient texto={"Observaciones"} colorAbajo='#097969' />
            {state?.observaciones?.length === 0 && (
                <View style={{}}>
                    <Text style={styles.text}>No hay Observaciones Cargadas</Text>
                </View>

            )}
            <FlatList

                data={state.observaciones} renderItem={renderizarObservaciones}>

            </FlatList>
            <CustomButton onPress={() => props.navigation.navigate('ObservacionesForm')} icon='pluscircleo' text='Agregar Observacion' />

        </View>)
}

export default ObservacionesList

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 5,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',

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

    },
    rightButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
    },

})