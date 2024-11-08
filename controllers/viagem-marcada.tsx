import { router } from "expo-router"
import { validarAccessToken } from "../models/auth"
import { buscarLugar } from "../models/google"
import { atualizarViagemMarcada, buscarTodasAsViagensMarcadas, buscarViagemMarcada, cadastrarViagemMarcada } from "../models/viagem-marcada"
import { Alert, Text } from "react-native"
import React from "react"

export async function buscarViagensMarcadas(accessToken: Promise<string | null>, setViagensMarcadas: React.Dispatch<React.SetStateAction<{data_viagem: string}[]>>){
    const dadosUsuario = await validarAccessToken(accessToken)
    
    if(dadosUsuario == null){
        return
    }
    
    const arrayDeViagens = await buscarTodasAsViagensMarcadas(dadosUsuario.id)

    setViagensMarcadas(arrayDeViagens)
}

export async function gravarViagemMarcada(
    accessToken: Promise<string | null>,
    data_viagem: string,
    ponto_partida: string,
    horario_partida: string,
    ponto_chegada: string,
    horario_chegada: string
) {
    const dadosUsuario = await validarAccessToken(accessToken)

    if(dadosUsuario == null){
        return
    }

    const localPartida = await buscarLugar(ponto_partida)
    const localChegada = await buscarLugar(ponto_chegada)

    if(localPartida.status == null || localPartida.status == "ZERO_RESULTS" || localPartida.status == "INVALID_REQUEST"){
        Alert.alert("Não encontrado", "Ponto de partida não encontrado.")
        return
    }

    if(localChegada.status == null || localChegada.status == "ZERO_RESULTS" || localChegada.status == "INVALID_REQUEST"){
        Alert.alert("Não encontrado", "Ponto de chegada não encontrado.")
        return
    }

    const viagemMarcada = await buscarViagemMarcada(dadosUsuario.id, data_viagem)

    let sucesso = false

    if(viagemMarcada == null){
        sucesso = await cadastrarViagemMarcada(
            dadosUsuario.id,
            data_viagem,
            ponto_partida,
            localPartida.results[0].geometry.location.lat,
            localPartida.results[0].geometry.location.lng,
            horario_partida,
            ponto_chegada,
            localChegada.results[0].geometry.location.lat,
            localChegada.results[0].geometry.location.lng,
            horario_chegada
        )
    } else {
        sucesso = await atualizarViagemMarcada(
            dadosUsuario.id,
            data_viagem,
            ponto_partida,
            localPartida.results[0].geometry.location.lat,
            localPartida.results[0].geometry.location.lng,
            horario_partida,
            ponto_chegada,
            localChegada.results[0].geometry.location.lat,
            localChegada.results[0].geometry.location.lng,
            horario_chegada
        )
    }

    if(sucesso){
        Alert.alert("Sucesso", "Gravado com sucesso!")
        router.back()
    } else {
        Alert.alert("Erro", "Erro ao gravar.")
    }
}