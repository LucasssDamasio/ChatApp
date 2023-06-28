import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { pegaUsuarioComMensagem } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaUsuario = ({ navigation }) => {
  const [data, setData] = useState([]);

  const pegaMensagemData = async () => {
    usuario = await AsyncStorage.getItem("usuario").then((data) =>
      JSON.parse(data)
    );
    
    const messages = await pegaUsuarioComMensagem(usuario.id);

    console.log(messages)
    setData(messages);
  };

  useEffect(() => {
    pegaMensagemData();

    const interval = setInterval(() => {
      pegaMensagemData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  
  const vaiparalistatotal = () => {
    navigation.navigate("ListaUsuarioTotal");
  };

  const MudaTelaVisualiza = (user) => {
    navigation.navigate("Mensagem", { user });
  };
  

  return (
    <>
      <View style={style.header}>
        <Text style={style.h1}>PomboZap</Text>
        <Text style={style.h1}> Sair</Text>
      </View>

      <View style={style.pagina}>
        <ScrollView style={{ width: "100%" }}>
          {data.map((user, index) => {
            const image = user.avatar
            ? "data:image/png;base64," +
            user.avatar.replace("data:image/png;base64,", "").replace("data:image;base64,", "")
            : undefined;

            return (
             <TouchableOpacity key={index} style={style.user} onPress={()=>MudaTelaVisualiza(user)}>
               <Image
                source={image ? {uri: image } : require('../../assets/Pigeon-PNG.png')}
                style={style.avatar}/>
              <Text >{user.nome}</Text>
             </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity onPress={vaiparalistatotal}>
              <Image
                source={require("../../assets/Pigeon-PNG.png")}
                style={style.pombo}
              />
            </TouchableOpacity>
      </View>
    </>
  );
};
const style = StyleSheet.create({
  header: {
    backgroundColor: "#4C7356",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
  },
  pagina: {
    backgroundColor: "#A8F0BB",
    width: "100%",
    flex: 1,
    padding: 10,
  },
  h1: {
    fontSize: 30,
    color: "#fff",
  },
  pombo: {
    width: 140,
    height: 140,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  user: {
    width: "100%",
    gap: 10,
    flexDirection: "row"
  }

});

export default ListaUsuario;
