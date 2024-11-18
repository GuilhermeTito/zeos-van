import { Alert } from "react-native"
import { validarAccessToken } from "../models/auth"
import { atualizarTurma, buscarPassageirosDaTurma, buscarTodasAsTurmas, buscarTurma, cadastrarTurma, deletarTurma } from "../models/turma"
import { cadastrarPassageiroTurma, deletarPassageiroTurma } from "../models/passageiro-turma"

export async function buscarTurmas(
    accessToken: Promise<string | null>,
    setTurmas: React.Dispatch<React.SetStateAction<{id: number, nome: string}[]>>
){
    const dadosUsuario = await validarAccessToken(accessToken)
    
    if(dadosUsuario == null){
        return
    }
    
    const arrayDeTurmas = await buscarTodasAsTurmas(dadosUsuario.id)

    if(arrayDeTurmas == null || arrayDeTurmas.length <= 0){
        setTurmas([{id: 0, nome: "Vazio"}])
    } else {
        setTurmas(arrayDeTurmas)
    }
}

export async function novaTurma(accessToken: Promise<string | null>, nome: string) {
    const dadosUsuario = await validarAccessToken(accessToken)
    
    if(dadosUsuario == null){
        return
    }

    const sucesso = await cadastrarTurma(dadosUsuario.id, nome)

    if(sucesso){
        Alert.alert("Turma cadastrada com sucesso!")
    } else {
        Alert.alert("Erro ao cadastrar turma.")
    }
}

export async function gravarAlteracoesTurma(id: string, id_passageiro_origem: string, id_passageiro_destino: string) {
    const sucesso = await atualizarTurma(id, id_passageiro_origem, id_passageiro_destino)

    if(sucesso){
        Alert.alert("Atualizado com sucesso!")
    } else {
        Alert.alert("Erro ao atualizar.")
    }
}

export async function excluirTurma(id: number) {
    const sucesso = await deletarTurma(id)

    if(sucesso){
        Alert.alert("Turma excluída com sucesso!")
    } else {
        Alert.alert("Erro ao excluir turma.")
    }
}

export async function buscarPassageiros(
    id_turma: string,
    setPassageiros: React.Dispatch<React.SetStateAction<{ id_passageiro: number, passageiro: { nome: string } }[]>>
) {
    const arrayDePassageiros = await buscarPassageirosDaTurma(id_turma)

    if(arrayDePassageiros == null || arrayDePassageiros.length <= 0){
        setPassageiros([{ id_passageiro: 0, passageiro: { nome: "Vazio" } }])
    } else {
        setPassageiros(arrayDePassageiros)
    }
}

export async function adicionarPassageiro(
    id_turma: string,
    id_passageiro: string
) {
    const sucesso = await cadastrarPassageiroTurma(id_turma, id_passageiro)

    if(sucesso){
        Alert.alert("Passageiro adicionado com sucesso!")
    } else {
        Alert.alert("Erro ao adicionar passageiro à turma.")
    }
}

export async function removerPassageiro(
    id_turma: string,
    id_passageiro: number
) {
    const sucesso = await deletarPassageiroTurma(id_turma, id_passageiro)

    if(sucesso){
        Alert.alert("Passageiro removido com sucesso!")
    } else {
        Alert.alert("Erro ao remover passageiro da turma.")
    }
}