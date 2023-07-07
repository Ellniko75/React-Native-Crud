import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import UserContext from '../provider/Provider'
const UsersForm = (props) => {
  const { dispatch } = useContext(UserContext)
  const userPorParametro = props?.route?.params

  const [ci, setCi] = useState(userPorParametro?.ci)
  const [name, setnombre] = useState(userPorParametro?.nombre)
  const [apellido, setApellido] = useState(userPorParametro?.apellido)


  const mustAdd = () => {
    if (!userPorParametro) {
      return true;
    }
    return false
  }

  const checkValidInputsInsert = () => {
    let message = ""
    if (ci == "" || name == "" || apellido == "") {
      message += "No se permiten campos vacíos \n"
    }
    if (ci.length < 8 && ci.length > 0) {
      message += "La cédula debe tener 8 caracteres \n"
    }
    if (message != "") {
      Alert.alert("Error", message)
    } else {
      return true
    }
  }
  const checkValidInputsModify = () => {
    let message = ""
    if (name == "" || apellido == "") {
      message += "Campos incompletos"
    }
    if (message != "") {
      Alert.alert("Error", message)
    }
    return true;
  }
  const handleClick = () => {
    if (mustAdd() && checkValidInputsInsert()) {
      dispatch({ type: 'addUser', payload: { nombre: name, apellido: apellido, ci: ci } });
      props.navigation.navigate("UsersList")
    }
    else {
      if (checkValidInputsModify()) {
        dispatch({ type: 'modifyUser', payload: { nombre: name, apellido: apellido, ci: ci } });
        props.navigation.navigate("UsersList")
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: -24 }}>

      <View>
        <Text style={styles.TitleHeader}>Usuario</Text>
      </View>
      <View style={styles.container}>
        {/*Solo mostraremos el InputText de la cédula si quiere agregar uno nuevo, de lo contrario, al editar, solo le dejaremos editar el nombre y apellido*/}
        {!props?.route?.params && (<><Text style={styles.center}>Ingrese La Cédula</Text>
          <TextInput
            maxLength={8}
            value={ci}
            onChangeText={(ci) => setCi(ci)}
            placeholder={ci}
            style={styles.input}
            keyboardType="numeric"
          /></>
        )}

        <Text style={styles.center}>Ingrese El Nombre</Text>
        <TextInput
          maxLength={40}
          value={name}
          onChangeText={(name) => { setnombre(name) }}
          placeholder={name}
          style={styles.input}
        />

        <Text style={styles.center}>Ingrese El Apellido</Text>
        <TextInput
          maxLength={40}
          value={apellido}
          onChangeText={(apellido) => { setApellido(apellido) }}
          placeholder={apellido}
          style={styles.input}
        />
        {/*En el boton, para el texto nos fijamos si recibió parámetros o no, de esa forma sabemos si el usuario entró a "Agregar usuarios" o a "Editar"*/}
        <CustomButton onPress={handleClick} icon={props?.route?.params ? "edit" : "pluscircleo"} text={props?.route?.params ? "Editar" : "Agregar Usuario"} />
      </View>


    </SafeAreaView>
  )
}

export default UsersForm

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
  },
  center: {
    fontSize: 20
  },
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
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
});