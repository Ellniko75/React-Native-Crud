import React, { useEffect, useState, useRef } from 'react';
//import all the components we are going to use
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


{/*
Este componente actua como un select
valorInicial=>valor que se mostrará por default, opcional
listaDesplegable=>array con los valores a desplegar
guardarEstado=>callback para guardar el estado local del componente al componente padre
etiqueta=>texto mostrado por default
renderizarItem=> funcion que le dice al picker qué value label y key va a tener cada picker.item
*/}
const Chooser = ({ guardarEstado, valorInicial, listaDesplegables, etiqueta, renderizarItem }) => {
  const [choosenLabel, setChoosenLabel] = useState();
  useEffect(() => {
    if (valorInicial) {
      setChoosenLabel(valorInicial);
    }
  }, [])

  return (
    <SafeAreaView style={{}}>
      <View style={{}}>
        <Picker
          value={""}
          selectedValue={choosenLabel}
          onValueChange={(itemValue) => {
            setChoosenLabel(itemValue);
            guardarEstado(itemValue);
          }}>

          <Picker.Item label={etiqueta} value={null} />
          {!renderizarItem ?
            listaDesplegables.map(item => {
              return (
                <Picker.Item label={item} value={item} key={item} />
              )
            })
            :
            listaDesplegables.map(item =>
              renderizarItem(item)
            )
          }
        </Picker>





      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Chooser;