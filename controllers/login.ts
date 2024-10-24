import AsyncStorage from "@react-native-async-storage/async-storage"
import { validarLogin, validarAccessToken } from "../models/auth"
import { Alert } from "react-native"
import { router } from "expo-router"

export async function login(tipoUsuario: string, email: string, senha: string) {
    const retornoToken = await validarLogin(tipoUsuario, email, senha)

    if(retornoToken == null || retornoToken?.accessToken == null){
        Alert.alert("Aviso", "E-mail ou senha informados incorretamente.")
        return
    }

    AsyncStorage.setItem("accessToken", retornoToken.accessToken)

    const dadosUsuario = await validarAccessToken(retornoToken.accessToken)

    if (dadosUsuario == null){
        Alert.alert("Aviso", "Erro ao validar token.")
        return
    }
    
    router.replace(dadosUsuario.tipoUsuario)
}