import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url= '192.168.137.29'
export function cadastro(nome,telefone,email,senha){
    axios.post(url+"/",{
        nome,telefone,email,senha
    }).then(({data})=>{
        console.log(data)
    })
}

const saveUserData = async (data) => {
    await AsyncStorage.setItem("usuario", JSON.stringify(data)).catch((err) => {
      throw err;
    });
  };

  const getUserHashcode = async (id) => {
    await axios.get(`${url}/user/${id}`).then(async ({ data }) => {
      await AsyncStorage.setItem("usuario_hash", JSON.stringify(data))
        .then(() => {
          setAuthenticated(true);
        })
        .catch((err) => {
          throw err;
        });
    });
  };


export function login (login,senha){
    axios.post(url+`/user/${login}/${senha}`
        
    )    .then(async ({ data }) => {
        await saveUserData(data);
        await getUserHashcode(data.id);
    
      })
      .catch(async (err) => {
    
        await AsyncStorage.removeItem("usuario");
        await AsyncStorage.removeItem("usuario_hash");
      })

        
    
}

export function hash (id){
    axios.get(url+`/user/${id}`
    ).then(({data}))
}