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
import Cadastro from "./cadastro";
import Mensagem from "./mensagem";


const Login = ({}) => {

    const[ inputse,setInputse] = useState("")
    const navigation= useNavigation();
    const [texttelefone, setTextTelefone] = useState("");
    const [textemail, setTextEmail] = useState("");
    
    
    return(
        <>
        <View style={style.pagina}>
            <View >
            <Text style={style.h1}>Bem vindo</Text>
            <View style={style.header}>
            <Text style={style.h1}>ao Pombo Zap</Text>
            
            <Image
                  source={require("../../assets/Pigeon-PNG.png")}
                  style={style.pombo}
                />
                </View>
            </View>
            

            <View style={style.inputArea}>
                <Text style={style.h1}>Faça seu login</Text>
                <Text style={style.h1}>Email</Text>
                <TextInputt placeholder={"Digite aqui  seu telefone...."}  ></TextInputt>
                <Text style={style.h1}>Senha</Text>
                <TextInputt 
                style={style.input} 
                placeholder={"Digite aqui  sua senha...."} 
                value={inputse}
                onChangeText={(texto)=> setInputse(texto)}
                secureTextEntry
                 ></TextInputt>

            <TouchableOpacity style={style.button} onPress={()=> navigation.navigate(Mensagem)}>
            <Text style={style.line}>Acessar</Text>
            </TouchableOpacity>


            </View>
            <View>
            <Text style={style.h1}>Esqueci minha senha</Text>
            <Text style={style.h1}>Não possui uma conta?</Text> 

            <TouchableOpacity style={style.button} onPress={()=> navigation.navigate(Cadastro)}>
            <Text style={style.line}>Cadastre-se</Text>
            </TouchableOpacity>
            

            </View>
    
        </View>
        </>
    )
}


const style = StyleSheet.create({
    pagina:{
        backgroundColor:"#4C7356",
        width: "100%",
        flex:1,
        justifyContent:"space-around",
        padding:10,
        

    },
    h1:{
        fontSize:35,
        color:"#fff"

    },
    pombo: {
        width: 140,
        height: 140,
        
      },
      header:{
        flexDirection: "row",

      },
      button: {
        alignSelf:"center",
        padding: 10,
        height: 60,
        width: 200,
        backgroundColor: "#A8F0BB",
      },
      line: {
        fontSize: 30,
        color: "#fff",
        textAlign: "center",
      },
    
    

        

    
    
});

export default Login;