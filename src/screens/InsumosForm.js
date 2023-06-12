import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import UserContext from '../provider/Provider'
const InsumosForm = (props) => {
  const { state,dispatch } = useContext(UserContext)

  const insumoPorParametro = props?.route?.params

  const [id, setId] = useState(insumoPorParametro?.id)
  const [name, setnombre] = useState(insumoPorParametro?.nombre)
  const [cantidad, setCantidad] = useState(insumoPorParametro? insumoPorParametro.cantidad:"" )

  const checkValidInputsInsert = () => {
    let message = ""
    if (id == "" || name == "" || cantidad == "") {
      message += "No se permiten campos vacíos \n"
    }
    if (id < 0) {
      message += "id no valida \n"
    }
    if(repeatedInsumo()){
      message += "Ya existe un insumo con ese id \n"
    }
    if (message != "") {
      Alert.alert("Error", message)
    } else {
      return true
    }
  }
  const checkValidInputsModify = () => {
    let message = ""
    if (name == "" || cantidad == "") {
      message += "Campos incompletos"
    }
    if (message != "") {
      Alert.alert("Error", message)
    }
    return true;
  }
  const handleClick = () => {
   
    if (!insumoPorParametro) {
      if (checkValidInputsInsert()) {
        dispatch({ type: 'addInsumos', payload: { nombre: name, cantidad: cantidad, id: id } });
        props.navigation.navigate("InsumosList")
      }
    }
    else{
      if (checkValidInputsModify()) {
        dispatch({ type: 'modifyInsumos', payload: { nombre: name, cantidad: cantidad, id: props.route.params.id } });
        props.navigation.navigate("InsumosList")
      }
    }

  }

  const repeatedInsumo = ()=>{
    for(insumo of state.insumos){
      if(insumo.id===id){
        return true;
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop:-24 }}>
      <View>
        <Text style={styles.TitleHeader}>Insumo</Text>
      </View>
      <View style={styles.container}>
        {!insumoPorParametro && (<><Text style={styles.center}>Ingrese Id</Text>
          <TextInput
            value={id}
            onChangeText={(id) => setId(id)}
            placeholder={id}
            style={styles.input}
            keyboardType="numeric"
          /></>
        )}
        
        <Text style={styles.center}>Ingrese nombre Insumo</Text>
        <TextInput
          maxLength={40}
          value={name}
          onChangeText={(name) => { setnombre(name) }}
          placeholder={name}
          style={styles.input}
        />

        <Text style={styles.center}>Ingrese la Cantidad</Text>
        <TextInput
          value={String(cantidad)}
          onChangeText={(cantidad) => { setCantidad(cantidad) }}
          placeholder={String(cantidad)}
          keyboardType="numeric"
          style={styles.input}
        />
        {/*En el boton, para el texto nos fijamos si recibió parámetros o no, de esa forma sabemos si el Insumos entró a "Agregar Insumos" o a "Editar"*/}
        <CustomButton onPress={handleClick} icon={insumoPorParametro ? "edit" : "pluscircleo"} text={insumoPorParametro ? "Editar" : "Agregar Insumos"} />
      </View>


    </SafeAreaView>
  )
}

export default InsumosForm

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
    paddingLeft:40,
    paddingRight:40,
  },
  TitleHeader:{
    fontSize:40,
    fontWeight:'bold',
    color:'#fff',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    backgroundColor:'#CB57F0',
    borderBottomRightRadius:70,
    marginBottom:20
  },
});