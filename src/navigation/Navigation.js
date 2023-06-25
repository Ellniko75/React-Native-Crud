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
                        title: 'Listado de Usuarios',
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
                        title: 'Formulario de Usuarios',
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
                        title: 'Listado de Zonas',
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
                        title: 'Formulario de Zonas',
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
                        title: 'Listado de Insumos',
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
                        title: 'Formulario de Insumos',
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
                        title: 'Observaciones',
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
                        title: 'Formulario de Observaciones',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 80,
                        },
                        headerTitleStyle: {
                            color: '#fff',
                            fontSize: 30
                        },
                    }} />



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation