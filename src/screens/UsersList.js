import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import UserContext from '../provider/Provider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Gradient from '../components/Gradient';
import { ScrollView } from 'react-native-gesture-handler';


const UsersList = (props) => {

  const { state, dispatch } = useContext(UserContext)

  const handleDelete = (item) => {
    let inUse = false
    state.tratamientos.forEach(trat => {
      if (trat.ciUser == item.ci) {
        Alert.alert("Error", "El usuario está en un tratamiento")
        inUse = true
        return
      }
    })

    if (!inUse) dispatch({ type: "deleteUser", payload: item })

  }

  const getRightContent = (item) => {
    return (
      <View style={styles.rightButtons}>
        {/*Si clickea el botón de editar lo mandamos al UserForm y le envíamos de parámetro el usuario que eligió editar*/}
        <TouchableOpacity onPress={() => props.navigation.navigate("UsersForm", item)}>
          <MaterialCommunityIcons name="square-edit-outline" size={50} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Desea borrar el Usuario?', '', [
          {
            text: 'No',
            onPress: () => console.log('Usuario no borrado'),
            style: 'cancel',
          },
          { text: 'Si', onPress: () => handleDelete(item) },
        ])}>
          <MaterialCommunityIcons name="delete-forever" size={50} color="#A41C1A" />
        </TouchableOpacity>

      </View>
    )
  }


  const renderizarUsuarios = ({ item }) => {
    return (
      <ListItem.Swipeable
        key={item?.id}
        rightContent={getRightContent(item)} // Agrega aquí el contenido para el lado derecho
        rightStyle={styles.buttonContainer}
        bottomDivider
        style={styles.container}
      >
        <ListItem.Content>
          <ListItem.Title>{"C.I: " + item?.ci}</ListItem.Title>
          <ListItem.Title>{item?.nombre + " " + item?.apellido}</ListItem.Title>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  };


  return (

    <>
      <Gradient texto={"Usuarios"} colorAbajo='#a33a5d' />
      {
        state?.users?.length === 0 && (
          <View style={styles.container}>
            <Text style={styles.text}>No hay usuarios cargados</Text>
          </View>

        )
      }
      <FlatList
        data={state.users} renderItem={renderizarUsuarios}>
      </FlatList>
      <CustomButton onPress={() => props.navigation.navigate('UsersForm')} icon='pluscircleo' text='Agregar Usuarios' />

    </>
  )

}

export default UsersList

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
    backgroundColor: '#a33a5d',
    borderBottomRightRadius: 70,

  },
  rightButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
  }

})