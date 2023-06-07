import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = (props) => (
  <View style={style.container}>
    <Text style={style.title}>{props.title}</Text>
  </View>

<TouchableOpacity style={style.button} onPress={()=> navigation.navigate(Cadastro)}>
<Text style={style.line}>Cadastre-se</Text>
</TouchableOpacity>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: "#8B008B",
    alignItens: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 50,
    color: "#fff",
    textAlign: "center",
  },
});

export default Button;