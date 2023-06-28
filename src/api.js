import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const url = "http://192.168.1.75:8080";

export function cadastra_user(nome, avatar, telefone, email, senha) {
  const dados = {
    nome: nome,
    avatar: avatar,
    telefone: telefone,
    email: email,
    senha: senha,
  };
  
  axios
    .post(`${url}/user/`, dados)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const saveUserData = async (data) => {
  await AsyncStorage.setItem("usuario", JSON.stringify(data)).catch((err) => {
    throw err;
  });
};

const getUserHashcode = async (id) => {
  await axios.get(`${url}/user/${id}`).then(async ({ data }) => {
    await AsyncStorage.setItem("usuario_hash", JSON.stringify(data)).catch(
      (err) => {
        console.log(err);
      }
    );
  });
};

export async function loga_user1(telefone, senha) {
  const user =  await axios
    .get(`${url}/user/${telefone}/${senha}`)
    .then(async ({ data }) => {
      await saveUserData(data);
      await getUserHashcode(data.id);
      return data;
    })
    .catch(async (err) => {
      await AsyncStorage.removeItem("usuario");
      await AsyncStorage.removeItem("usuario_hash");
      console.log(err);
      return null;
    });

    return user;
}

export function hash(id) {
  axios.get(url + `/user/${id}`).then({ data });
}
export const getUser = async (identification) => {
  const user = await axios
    .get(`${url}/message/buscarUsuarios/${identification}`)
    .then(({ data }) => data)
    .catch((err) => console.log("An error ocurred on the getUser method: ", err));

  return user;
};

export const pegaUsuarioComMensagem = async (id) => {
  const users = await axios
    .get(`${url}/message/buscarUsuariosComConversa/${id}`)
    .then(({ data }) => data)
    .catch((err) => console.log("An error ocurred on the pegaUsuarioComMensagem method: ", err));

  return users;
};

export const pegaMensagem = async (id, idOther) => {
  const messages = await axios
    .get(`${url}/message/buscarMensagensComUmUsuario/${id}/${idOther}`)
    .then(({ data }) => data)
    .catch((err) => console.log("An error ocurred on the pegaMensagem method: ", err));

  return messages;
};

export const mandaMensagem = async (idFrom, idTo, message) => {
  await axios
    .post(`${url}/message/enviarMensagem`, {
      idFrom,
      idTo,
      mensagem: message,
    })
    .catch((err) => console.log("An error ocurred on the mandaMensagem method: ", err));
};
export const PegaContatos = async (login) => {
  const users = await axios
    .get(`${url}/message/buscarUsuarios/${login}`)
    .then(({ data }) => data)
    .catch((err) => console.log("An error ocurred on the PegaCOntato method: ", err));

  return users;
};
