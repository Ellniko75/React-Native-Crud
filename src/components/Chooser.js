import React, { useEffect, useState } from 'react';

//import all the components we are going to use
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';

{/*
Este componente actua como un select
valorInicial=>valor que se mostrará por default, opcional
listaDesplegable=>array con los valores a desplegar
guardarEstado=>callback para guardar el estado local del componente al componente padre
*/}
const Chooser = ({ guardarEstado, valorInicial, listaDesplegables, etiqueta }) => {
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
          value=""
          selectedValue={choosenLabel}
          onValueChange={(itemValue) => {
            setChoosenLabel(itemValue);
            guardarEstado(itemValue);
          }}>
          <Picker.Item label={etiqueta} value={null} />
          {
            listaDesplegables.map(item => {
              return (
                <Picker.Item label={item} value={item} key={item} />
              )
            })
          }



        </Picker>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Chooser;