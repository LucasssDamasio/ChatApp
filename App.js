import React from "react";
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './src/pages/login';
import Cadastro from "./src/pages/cadastro";
import Mensagem from "./src/pages/mensagem";


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
 


