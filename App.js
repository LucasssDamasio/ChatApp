import React from "react";
import { StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from "./src/pages/cadastro";
import Login from './src/pages/login';
import Mensagem from "./src/pages/mensagem";
import ListaUsuario from "./src/pages/listausuario";
import ListaUsuarioTotal from "./src/pages/listausuariototal";


const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = React.useRef();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown:false
        }}> 
        
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Mensagem" component={Mensagem} />
          <Stack.Screen name="ListaUsuario" component={ListaUsuario} />
          <Stack.Screen name="ListaUsuarioTotal" component={ListaUsuarioTotal} />
          
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const style = StyleSheet.create({
  container: {
       
   flex:1,
   width:"100%"
   
 
  }    
   });
 


