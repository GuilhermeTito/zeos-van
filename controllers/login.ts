import AsyncStorage from "@react-native-async-storage/async-storage"
import { validarLogin, validarAccessToken } from "../models/auth"
import { router } from "expo-router"

export async function login(tipoUsuario: string, email: string, senha: string, setMsgErroLogin: React.Dispatch<React.SetStateAction<string>>) {
    const retornoToken = await validarLogin(tipoUsuario, email, senha)

    if(retornoToken == null || retornoToken?.accessToken == null){
        setMsgErroLogin("E-mail ou senha informados incorretamente.")
        return
    }

    AsyncStorage.setItem("accessToken", retornoToken.accessToken)

    const dadosUsuario = await validarAccessToken(retornoToken.accessToken)

    if (dadosUsuario == null){
        setMsgErroLogin("Erro ao validar token.")
        return
    }
    
    router.replace(dadosUsuario.tipoUsuario)
}