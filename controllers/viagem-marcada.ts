import { router } from "expo-router"
import { validarAccessToken } from "../models/auth"
import { buscarLugar } from "../models/google"
import { atualizarViagemMarcada, atualizarViagemMarcadaPorId, buscarTodasAsViagensMarcadas, buscarViagemMarcada, buscarViagemMarcadaPorId, cadastrarViagemMarcada } from "../models/viagem-marcada"
import { Alert } from "react-native"
import React from "react"

export async function preencherDadosViagem(
    id: string,
    setDataViagem: React.Dispatch<React.SetStateAction<string>>,
    setPontoPartida: React.Dispatch<React.SetStateAction<string>>,
    setHorarioPartida: React.Dispatch<React.SetStateAction<string>>,
    setPontoChegada: React.Dispatch<React.SetStateAction<string>>,
    setHorarioChegada: React.Dispatch<React.SetStateAction<string>>
) {
    const viagemMarcada = await buscarViagemMarcadaPorId(id)

    if(viagemMarcada == null){
        return
    }

    setDataViagem(viagemMarcada.data_viagem)
    setPontoPartida(viagemMarcada.ponto_partida)
    setHorarioPartida(viagemMarcada.horario_partida)
    setPontoChegada(viagemMarcada.ponto_chegada)
    setHorarioChegada(viagemMarcada.horario_chegada)
}

export async function buscarViagensMarcadas(accessToken: Promise<string | null>, setViagensMarcadas: React.Dispatch<React.SetStateAction<{id: number, data_viagem: string}[]>>){
    const dadosUsuario = await validarAccessToken(accessToken)
    
    if(dadosUsuario == null){
        return
    }
    
    const arrayDeViagens = await buscarTodasAsViagensMarcadas(dadosUsuario.id)

    if(arrayDeViagens == null){
        setViagensMarcadas([{id: 0, data_viagem: "Vazio"}])
    } else {
        setViagensMarcadas(arrayDeViagens)
    }
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

export async function gravarViagemMarcadaPorId(
    id: string,
    data_viagem: string,
    ponto_partida: string,
    horario_partida: string,
    ponto_chegada: string,
    horario_chegada: string
) {
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

    const sucesso = await atualizarViagemMarcadaPorId(
        id,
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
    
    if(sucesso){
        Alert.alert("Sucesso", "Gravado com sucesso!")
        router.back()
    } else {
        Alert.alert("Erro", "Erro ao gravar.")
    }
}