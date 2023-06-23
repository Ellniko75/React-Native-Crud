import React, { useEffect, useState } from 'react';

//import all the components we are going to use
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';

const Chooser = ({guardarEstado,valorInicial,listaDesplegables}) => {
  const [choosenLabel, setChoosenLabel] = useState();
  useEffect(() => {
    if (valorInicial) {
      setChoosenLabel(valorInicial);
    }
  }, [])

  return (
    <SafeAreaView style={{}}>
      <View style={{}}>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          value=""
          selectedValue={choosenLabel}
          onValueChange={(itemValue) => {
            setChoosenLabel(itemValue);
            //ejecutamos el callback que le llega por parámetros para setear el estado en el otro componente
            guardarEstado(itemValue);
          }}>
          <Picker.Item label="Eliga una Opcion" value={null} />
          {
            listaDesplegables.map(item=>{
              return(
                <Picker.Item label={item} value={item} key={item}/>
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