import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import UserContext from '../provider/Provider';
import Gradient from '../components/Gradient';


const ZoneList = (props) => {

  const { state, dispatch } = useContext(UserContext)

  const getRightContent = (item) => {
    return (
      <View style={styles.rightButtons}>
        {/*Si clickea el botón de editar lo mandamos a la ZoneForm y le envíamos de parámetro la zona que eligió editar*/}
        <TouchableOpacity onPress={() => props.navigation.navigate("ZoneForm", item)}>
          <MaterialCommunityIcons name="square-edit-outline" size={50} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Desea borrar la zona?', '', [
          {
            text: 'No',
            onPress: () => console.log('Zona no borrada'),
            style: 'cancel',
          },
          { text: 'Si', onPress: () => dispatch({ type: "deleteZone", payload: item })  },
          
        ])}>
          <MaterialCommunityIcons name="delete-forever" size={50} color="#A41C1A" />
        </TouchableOpacity>

      </View>
    )
  }


  const renderizarZona = ({ item }) => {
    return (
      <ListItem.Swipeable
        key={{latitud:item.latitud,
        longitud:item.longitud}}
        rightContent={getRightContent(item)} // Agrega aquí el contenido para el lado derecho
        rightStyle={styles.buttonContainer}
        bottomDivider
        style={styles.container}
      >
        <ListItem.Content>
          <ListItem.Title>{"Lugar:" + item?.lugar}</ListItem.Title>
          <ListItem.Title>{"Dep:" + item?.departamento}</ListItem.Title>
          <ListItem.Title>{"Trabajadores: " + item?.cantidadTrabajadores}</ListItem.Title>
          <ListItem.Subtitle>{"LAT:" + item?.latitud + "\n" + "LONG:" + item?.longitud}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  };


  return (
    <View style={styles.backgroundView}>
      <Gradient texto={"Zonas"} colorAbajo='#ff6c00'/>
      {state?.zonas?.length === 0 && (
        <View style={styles.container}>
          <Text style={styles.text}>No hay Zonas Cargadas</Text>
        </View>

      )}
      <FlatList
        data={state.zones} renderItem={renderizarZona}>
      </FlatList>
      <CustomButton onPress={() => props.navigation.navigate('ZoneForm')} icon='pluscircleo' text='Agregar Zona' />

    </View>
  )

}

export default ZoneList

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