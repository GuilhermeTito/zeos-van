import { Alert } from "react-native"
import cadastrarMotorista from "../models/motorista"
import cadastrarPassageiro from "../models/passageiro"
import { router } from "expo-router"

export default async function cadastro(tipoUsuario: string, nome: string, email: string, telefone: string, senha: string) {    
    if (nome == null || nome == "" || email == null || email == "" || senha == null || senha == ""){
        Alert.alert("Aviso", "Preencha os campos obrigatórios -> nome, e-mail e senha.")
        return
    }

    let sucesso: boolean

    if(tipoUsuario == "motorista") {
        sucesso = await cadastrarMotorista(nome, email, telefone, senha)
    } else {
        sucesso = await cadastrarPassageiro(nome, email, telefone, senha)
    }

    if(!sucesso) {
        Alert.alert("Erro", "Não foi possível realizar o cadastro.")
        return
    }

    Alert.alert("Sucesso", "Cadastro feito com sucesso!")
    router.replace("/")
}