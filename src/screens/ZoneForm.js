import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../provider/Provider'
import { useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import CustomButton from '../components/CustomButton'
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import Chooser from '../components/Chooser'



const ZoneForm = (props) => {

  const { state, dispatch } = useContext(UserContext)
  const zonaPorParametro = props?.route?.params

  //Si le llega un objeto zona como parámetro seteará sus propiedades en el estado
  const [latitud, setLatitud] = useState(zonaPorParametro?.latitud);
  const [longitud, setLongitud] = useState(zonaPorParametro?.longitud);
  const [lugar, setLugar] = useState(zonaPorParametro?.lugar);
  const [departamento, setDepartamento] = useState(zonaPorParametro?.departamento);
  const [cantidadTrabajadores, setCantTrabajadores] = useState(zonaPorParametro?.cantidadTrabajadores.toString());



  const mustInsert=()=>{
    if(zonaPorParametro){
      return false
    }
    return true;
  }


  const createZone = () => {
    return {
      latitud: latitud,
      longitud: longitud,
      lugar: lugar,
      departamento: departamento,
      cantidadTrabajadores: cantidadTrabajadores
    }
  }

  const fetchLocalization = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Error")
        return;
      }

      let localizacion = await Location.getCurrentPositionAsync({});
      setLatitud(localizacion.coords.latitude);
      setLongitud(localizacion.coords.longitude);
    
  }

  useEffect(() => {
    if (!zonaPorParametro){
      fetchLocalization();
    }
  }, []);

  const zoneIsRepeated = () => {
    for (zone of state.zones) {
      if (zone.latitud == latitud && zone.longitud == longitud) {
        return true
      }
    }
  }


  const isInputInvalid = () => {
    if (lugar == null || departamento == null || cantidadTrabajadores == null || latitud == null || longitud == null) {
      return true
    }
  }

  const handleClick = () => {
    if (isInputInvalid()) {
      Alert.alert("Error", "Por favor, rellena todos los campos")
      return;
    }
    if (mustInsert()) {
      if(zoneIsRepeated()){
        Alert.alert("Error","Zona repetida")
      }else{
        let zone = createZone();
        dispatch({ type: 'insertZone', payload: zone })
        props.navigation.navigate("ZoneList");
      }
    }
    else{
      let zone = createZone();
      dispatch({ type: 'editZone', payload: zone })
      props.navigation.navigate("ZoneList");
    }

  }
  {/*funcion que se pasa como callback al componente chooser para que guarde los datos del lugar*/ }
  const setearLugarEnChooser = (value) => {
    setLugar(value);
  }


  return (

    <SafeAreaView style={{ flex: 1 , marginTop:-24}}>
      <View>
        <Text style={styles.TitleHeader}>Zona</Text>
      </View>

      <View style={styles.container}>

        

        <Text style={styles.center}>Ingrese Departamento</Text>
        <TextInput
          maxLength={20}
          value={departamento}
          onChangeText={(departamento) => { setDepartamento(departamento) }}
          placeholder={departamento}
          style={styles.input}

        />


        <Text style={styles.center}>Ingrese Cantidad de Trabajadores</Text>
        <TextInput
          maxLength={40}
          value={cantidadTrabajadores}
          onChangeText={(cantTrabajadores) => { setCantTrabajadores(cantTrabajadores) }}
          placeholder={cantidadTrabajadores}
          keyboardType='numeric'
          style={styles.input}
        />
        <Chooser guardarEstado={setearLugarEnChooser} valorInicial={lugar} />

        {/*En el boton, para el texto nos fijamos si recibió parámetros o no, de esa forma sabemos si el usuario entró a "Agregar usuarios" o a "Editar"*/}
        <CustomButton onPress={handleClick} icon={props?.route?.params ? "edit" : "pluscircleo"} text={props?.route?.params ? "Editar Zona" : "Agregar Zona"} />
      </View>


    </SafeAreaView>
  )
}

export default ZoneForm

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    
  },
  center:{
    fontSize:20,
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
    backgroundColor:'#ff6c00',
    borderBottomRightRadius:70,
    marginBottom:40,
  },
})