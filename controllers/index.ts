import AsyncStorage from "@react-native-async-storage/async-storage"
import { validarAccessToken } from "../controllers/auth"

export async function verificarAccessToken(setLinkPagina: React.Dispatch<React.SetStateAction<string>>) {
    AsyncStorage.setItem("accessToken", "")
    //AsyncStorage.setItem("accessToken", "teste")
    
    const accessToken = await AsyncStorage.getItem("accessToken")
    
    const dadosUsuario = await validarAccessToken(accessToken)

    if (dadosUsuario == null){
        setLinkPagina("login")
    } else {
        setLinkPagina(dadosUsuario.tipoUsuario)
    }
}