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
import Login from "./login";
import Mensagem from "./mensagem";
import * as ImagePicker from "expo-image-picker";
import { cadastra_user } from "../api";


const Cadastro = ({}) => {
  const [avatar, setAvatar] = useState("");
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [senha, setSenha] = useState();
    const navigation= useNavigation();
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      } else {
        alert(" Foto não selecionada");
      }
    
    };
    const InfoNome = () => {
      alert(" Nome que ira aparecer para outros usuarios ");
      
    };
    const salvarUsuario = async () => {
      cadastra_user(nome,avatar,telefone,email,senha)
      MensagemPagina()
  }

  const MensagemPagina = () => {
      navigation.navigate('Mensagem')
  }
    
    return(
        <>
        
        <View style={style.pagina}>
        <View >
            <View style={style.header}>
            <Text style={style.h1}>Cadastre-se</Text>
            
            <Image
                  source={require("../../assets/Pigeon-PNG.png")}
                  style={style.pombo}
                />
                </View>
            </View>
            

            <View style={style.inputArea}>
            <Text style={style.h2}>Foto</Text>
                    <TouchableOpacity onPress={pickImageAsync}>
                  {avatar ? (
                    <Image source={{ uri: avatar }} style={style.adduser} />
                  ) : (
                    <Image
                      source={require("../../assets/addUserIcon.png")}
                      style={style.adduser}
                    />
                  )}
                </TouchableOpacity>
                <View style={style.inputNome}>
                <Text style={style.h2}>Nome</Text>
                <TouchableOpacity onPress={InfoNome}>
                <Image
                  source={require("../../assets/Info.png")}
                  style={style.info}
                />
                </TouchableOpacity>
                </View>
                <TextInputt placeholder={"Digite aqui  seu nome...."} 
                text={nome}
                onChangeText={setNome} ></TextInputt>
              

                <Text style={style.h2}>Telefone</Text>
                <TextInputt placeholder={"Digite aqui  seu telefone...."} 
                text={telefone}
                onChangeText={setTelefone} ></TextInputt>

                <Text style={style.h2}>Email</Text>
                <TextInputt placeholder={"Digite aqui  seu email...."}  >
                text={email}
                onChangeText={setEmail}
                </TextInputt>
                <Text style={style.h2}>Senha</Text>
                <TextInputt 
                style={style.input} 
                placeholder={"Digite aqui  sua senha...."} 
                value={senha}
                onChangeText={(texto)=> setSenha(texto)}
                secureTextEntry
                 ></TextInputt>

            <TouchableOpacity style={style.button} onPress={cadastra_user}>
            <Text style={style.line}>Cadastrar</Text>
            </TouchableOpacity>
            </View>
            <View>
            <Text style={style.h1}>ja possui uma conta?</Text> 

            <TouchableOpacity style={style.button} onPress={()=> navigation.navigate("Login")}>
            <Text style={style.line}>Faça Login</Text>
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
    fontSize:30,
    color:"#fff"

},
h2:{
  fontSize:20,
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
  adduser: {
    width: 100,
    height: 100,
  },
  info: {
    width: 25,
    height: 25,
  },
  inputNome :{
    flexDirection: "row",
    width:"100%"


  },

})

export default Cadastro;