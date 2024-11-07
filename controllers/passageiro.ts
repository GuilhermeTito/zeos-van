import { validarAccessToken } from "../models/auth"
import { buscarLugar } from "../models/google"
import { atualizarPassageiro, buscarPassageiro } from "../models/passageiro"
import { Alert } from "react-native"

export async function preencherDadosPassageiro(accessToken: Promise<string | null>, setId: React.Dispatch<React.SetStateAction<number>>, setNome: React.Dispatch<React.SetStateAction<string>>, setEmail: React.Dispatch<React.SetStateAction<string>>, setTelefone: React.Dispatch<React.SetStateAction<string>>, setPontoPartida: React.Dispatch<React.SetStateAction<string>>, setHorarioPartida: React.Dispatch<React.SetStateAction<string>>, setPontoChegada: React.Dispatch<React.SetStateAction<string>>, setHorarioChegada: React.Dispatch<React.SetStateAction<string>>) {
    const dadosUsuario = await validarAccessToken(accessToken)

    if(dadosUsuario == null){
        return
    }

    const passageiro = await buscarPassageiro(dadosUsuario.id)

    if(passageiro != null) {
        setId(passageiro.id)
        setNome(passageiro.nome)
        setEmail(passageiro.email)
        setTelefone(passageiro.telefone)
        setPontoPartida(passageiro.ponto_partida_padrao)
        setHorarioPartida(passageiro.horario_partida_padrao)
        setPontoChegada(passageiro.ponto_chegada_padrao)
        setHorarioChegada(passageiro.horario_chegada_padrao)
    }
}

export async function gravarAlteracoesPassageiro(
    accessToken: Promise<string | null>,
    nome: string,
    telefone: string,
    ponto_partida_padrao: string,
    horario_partida_padrao: string,
    ponto_chegada_padrao: string,
    horario_chegada_padrao: string
) {
    const dadosUsuario = await validarAccessToken(accessToken)

    if(dadosUsuario == null){
        return
    }

    const localPartida = await buscarLugar(ponto_partida_padrao)
    const localChegada = await buscarLugar(ponto_chegada_padrao)

    if(localPartida.status == null || localPartida.status == "ZERO_RESULTS" || localPartida.status == "INVALID_REQUEST"){
        Alert.alert("Não encontrado", "Ponto de partida não encontrado.")
        return
    }

    if(localChegada.status == null || localChegada.status == "ZERO_RESULTS" || localChegada.status == "INVALID_REQUEST"){
        Alert.alert("Não encontrado", "Ponto de chegada não encontrado.")
        return
    }

    const sucesso = await atualizarPassageiro(
        dadosUsuario.id,
        nome,
        telefone,
        ponto_partida_padrao,
        localPartida.results[0].geometry.location.lat,
        localPartida.results[0].geometry.location.lng,
        horario_partida_padrao,
        ponto_chegada_padrao,
        localChegada.results[0].geometry.location.lat,
        localChegada.results[0].geometry.location.lng,
        horario_chegada_padrao
    )
    
    if(sucesso){
        Alert.alert("Sucesso", "Atualizado com sucesso!")
    } else {
        Alert.alert("Erro", "Erro ao atualizar dados.")
    }
    
}