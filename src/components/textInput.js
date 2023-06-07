import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import{Ionicons} from '@expo/vector-icons';


const TextInputt = ({text, onChangeText, placeholder, secureTextEntry=(false)}) => {
  const[ hidePass,setHidePass] = useState(secureTextEntry);

  return (
    <View style={styles.inputGeral}>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        secureTextEntry={hidePass}
      />
       </View>
       {
        secureTextEntry && (
          <TouchableOpacity style={styles.icon} onPress={()=> setHidePass(!hidePass)}>
                    { hidePass ?
                     <Ionicons name="eye" color={"#fff"}size={25}></Ionicons>
                     :
                     <Ionicons name="eye-off" color={"#fff"}size={25}></Ionicons>
                    }
                    
                </TouchableOpacity>
        )
       }

     
      
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth:1,
    padding: 10,
    
  },
  inputGeral:{
    gap:10,
    flexDirection:"row",
    width: "100%",
    alignItems:"center",
  },

  inputContainer:{
    backgroundColor:"#fff",
    flex:1,
    
  },

});

export default TextInputt;
