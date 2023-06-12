import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Home from "../screens/Home";
import UsersList from "../screens/UsersList";
import UsersForm from "../screens/UsersForm";
import ZoneList from "../screens/ZoneList";
import ZoneForm from "../screens/ZoneForm";
import InsumosList from "../screens/InsumosList";
import InsumosForm from "../screens/InsumosForm";

const screenOptions = {
    headerStyle: {
        backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold",
    }
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen name="Home" component={Home}
                    options={{
                        title: 'Inicio',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
                            height: 100,
                        },
                        headerTitleStyle: {
                            color: '#fff',
                            fontSize: 40
                        },
                    }} />
                <Stack.Screen name="UsersList" component={UsersList}
                    options={{
                        title: 'Listado de Usuarios',
                        headerStyle: {
                            backgroundColor: '#4F17F0',
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
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerShadowVisible: false,
                    }} />



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation