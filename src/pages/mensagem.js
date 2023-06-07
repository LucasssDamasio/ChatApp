import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TextInputt from "../components/textInput";
import{Ionicons} from '@expo/vector-icons';
import{ useNavigation} from '@react-navigation/native';



const Mensagem = ({}) => {

    
    const navigation= useNavigation();
    return(
        <>
        
        <View>
          <Text>Tela de Mensagem</Text>
        </View>
        
        
        </>
    )

}
const style = StyleSheet.create({

})

export default Mensagem;