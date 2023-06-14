import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { loga_user1 } from "../api";
import TextInputt from "../components/textInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  async function logar() {
    await loga_user1(telefone, senha).then((usuario) => {
      if (usuario) {
        navigation.navigate("Mensagem");
      } else {
        alert("telefone ou senha incorretos");
      }
    });
  }

  useEffect(() => {
    (async () => {
      let dadosUsuario;
      const dados = await AsyncStorage.getItem("usuario");
      if (dados) dadosUsuario = JSON.parse(dados);
      else return;
      navigation.navigate("Mensagem");
    })();
  }, []);

  return (
    <>
      <View style={style.pagina}>
        <View>
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
          <Text style={style.h1}>Telefone</Text>
          <TextInputt
            placeholder={"Digite aqui  seu telefone...."}
            text={telefone}
            onChangeText={setTelefone}
          ></TextInputt>
          <Text style={style.h1}>Senha</Text>
          <TextInputt
            style={style.input}
            placeholder={"Digite aqui  sua senha...."}
            value={senha}
            onChangeText={(texto) => setSenha(texto)}
            secureTextEntry
          ></TextInputt>

          <TouchableOpacity style={style.button} onPress={logar}>
            <Text style={style.line}>Acessar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.h1}>Não possui uma conta?</Text>

          <TouchableOpacity
            style={style.button}
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text style={style.line}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  pagina: {
    backgroundColor: "#4C7356",
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
    padding: 10,
  },
  h1: {
    fontSize: 35,
    color: "#fff",
  },
  pombo: {
    width: 140,
    height: 140,
  },
  header: {
    flexDirection: "row",
  },
  button: {
    alignSelf: "center",
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
