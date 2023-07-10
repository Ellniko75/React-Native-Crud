import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native-elements";
const Stack = createStackNavigator();
import Home from "../screens/Home";
import UsersList from "../screens/UsersList";
import UsersForm from "../screens/UsersForm";
import ZoneList from "../screens/ZoneList";
import ZoneForm from "../screens/ZoneForm";
import InsumosList from "../screens/InsumosList";
import InsumosForm from "../screens/InsumosForm";
import ObservacionesList from "../screens/ObservacionesList";
import ObservacionesForm from "../screens/ObservacionesForm";
import TratamientosList from "../screens/TratamientosList";
import TratamientosForm from "../screens/TratamientosForm";
import TratamientosMapa from "../screens/TratamientosMapa";
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen name="Home" component={Home}
                    options={{
                        title: 'Inicio',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80,
                        },
                        headerTitleStyle: {
                            color: '#fff',
                            fontSize: 30
                        },
                    }} />
                <Stack.Screen name="UsersList" component={UsersList}
                    options={{
                        title: 'Lista',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false
                    }} />
                <Stack.Screen name="UsersForm" component={UsersForm}
                    options={{
                        title: 'Formulario',
                        headerStyle: {
                            backgroundColor: '#a33a5d',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false,
                    }} />
                <Stack.Screen name="ZoneList" component={ZoneList}
                    options={{
                        title: 'Lista',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false
                    }}
                />
                <Stack.Screen name="ZoneForm" component={ZoneForm}
                    options={{
                        title: 'Formulario',
                        headerStyle: {
                            backgroundColor: '#ff6c00',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false,
                    }} />
                <Stack.Screen name="InsumosList" component={InsumosList}
                    options={{
                        title: 'Lista',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen name="InsumosForm" component={InsumosForm}
                    options={{
                        title: 'Formulario',
                        headerStyle: {
                            backgroundColor: '#CB57F0',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false,
                    }} />
                <Stack.Screen name="ObservacionesList" component={ObservacionesList}
                    options={{
                        title: 'Lista',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80,
                        },
                        headerTitleStyle: {
                            color: '#fff',
                            fontSize: 30
                        },
                    }} />
                <Stack.Screen name="ObservacionesForm" component={ObservacionesForm}
                    options={{
                        title: 'Formulario',
                        headerStyle: {
                            backgroundColor: '#097969',
                            height: 80,
                        },
                        headerTitleStyle: {
                            color: '#fff',
                            fontSize: 30
                        },
                    }} />
                <Stack.Screen name="TratamientosList" component={TratamientosList}
                    options={{
                        title: 'Lista',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false
                    }} />
                <Stack.Screen name="TratamientosForm" component={TratamientosForm}
                    options={{
                        title: 'Formulario',
                        headerStyle: {
                            backgroundColor: '#5fb9ba',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false
                    }} />
                <Stack.Screen name="TratamientosMapa" component={TratamientosMapa}
                    options={{
                        title: 'Mapa de Tratamientos',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false
                    }} />




            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation