import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


  const url= '192.168.56.1'
export function cadastra_user(nome,avatar,telefone,email,senha){
  const dados= {
    "nome": nome,
    "avatar": avatar,
    "telefone": telefone,
    "email": email,
    "senha": senha
}
    console.log(dados)
    axios.post(`${url}+/user/`, dados
        ).then(({data})=>{
        console.log(data)
    })
    .catch((err) => {
      console.log(err)
    });
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


export function loga_user (login,senha){
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