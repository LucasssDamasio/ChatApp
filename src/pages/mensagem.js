import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { mandaMensagem, pegaMensagem } from "../api";
import TextInputt from "../components/textInput";

const Mensagem = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params || {};
  const [messageText, setMessageText] = useState("");
  const [data, setData] = useState([]);
  const date = new Date(data.dataHora);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const handleGetMessages = async () => {
    const usuario = await AsyncStorage.getItem("usuario").then((data) =>
      JSON.parse(data)
    );

    const messages = await pegaMensagem(usuario.id, user.id);

    console.log(messages)

    messages.sort((a, b) => a.dataHora.localeCompare(b.dataHora));
    setData(messages);
  };

  const handleAddMessageLocally = async (text) => {

    const usuario = await AsyncStorage.getItem("usuario").then((data) =>
      JSON.parse(data)
    );

    const newMessage = {
      from: {
        ...usuario,
      },
      to: {
        ...user,
      },
      mensagem: text,
      dataHora: new Date(),
    };

    delete newMessage.from.avatar;
    delete newMessage.to.avatar;

    data.push(newMessage);
  };

  const handleSendMessage = async () => {
    const usuario = await AsyncStorage.getItem("usuario").then((data) =>
      JSON.parse(data)
    );

    await mandaMensagem(usuario.id, user.id, messageText);
    handleAddMessageLocally(messageText);
    setMessageText("");
  };

  useEffect(() => {
    if (user) {
      handleGetMessages();

      const interval = setInterval(() => {
        handleGetMessages();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <>
      <View style={style.pagina}>
        {user && (
          <>
            <View style={style.header}>
              <Text style={style.h1}>{user.nome}</Text>
            </View>

            <View style={style.meio}>
              {data.map((mensagem, index) => {
                return (
                  <View
                    key={index}
                    style={
                      mensagem.from.id == user.id
                        ? style.recebido
                        : style.enviado
                    }
                  >
                    <View
                      style={
                        mensagem.from.id == user.id
                          ? style.mensagemRecebida
                          : style.mensagemEnviada
                      }
                    >
                      <Text style={style.text}> {mensagem.mensagem} </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}

        <View style={style.footer}>
          <TextInputt
            value={messageText}
            onChangeText={setMessageText}
            placeholder={"Digite aqui  sua mensagem...."}
          ></TextInputt>
          <TouchableOpacity onPress={handleSendMessage}>
            <Image
              source={require("../../assets/Pigeon-PNG.png")}
              style={style.pombo}
            />
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between",
    gap: 10
  },
  meio: {
    flex: 1,
    width: "100%",
    gap: 10
  },
  h1: {
    fontSize: 30,
    color: "#fff",
  },
  pombo: {
    width: 70,
    height: 70,
  },
  footer: {
    width: "100%",
  },
  recebido: {
    width: "100%",
    flexDirection: "row",
  },
  enviado: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mensagemRecebida: {
    backgroundColor: "#111211",
    padding: 10,
  },
  mensagemEnviada: {
    backgroundColor: "#4C7356",
    padding: 10,
  },
  text: {
    color: "white",
  },
});

export default Mensagem;
