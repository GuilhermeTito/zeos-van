import AsyncStorage from "@react-native-async-storage/async-storage"
import { validarAccessToken } from "../models/auth"

export async function verificarAccessToken(setLinkPagina: React.Dispatch<React.SetStateAction<string>>) {
    const accessToken = await AsyncStorage.getItem("accessToken")
    
    const dadosUsuario = await validarAccessToken(accessToken)

    if (dadosUsuario == null){
        setLinkPagina("login")
    } else {
        setLinkPagina(dadosUsuario.tipoUsuario)
    }
}