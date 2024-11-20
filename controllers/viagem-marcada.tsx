import { router } from "expo-router"
import { validarAccessToken } from "../models/auth"
import { buscarLugar } from "../models/google"
import { atualizarViagemMarcada, atualizarViagemMarcadaPorId, buscarCoordenadasPorTurmaEData, buscarTodasAsViagensMarcadas, buscarTodasAsViagensMarcadasPorMotorista, buscarViagemMarcada, buscarViagemMarcadaPorId, cadastrarViagemMarcada } from "../models/viagem-marcada"
import { Alert, Text } from "react-native"
import React from "react"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from "react-native-maps-directions"

export async function preencherDadosViagem(
    id: string,
    setDataViagem: React.Dispatch<React.SetStateAction<string>>,
    setVaiNoDia: React.Dispatch<React.SetStateAction<boolean>>,
    setPontoPartida: React.Dispatch<React.SetStateAction<string>>,
    setHorarioPartida: React.Dispatch<React.SetStateAction<string>>,
    setPontoChegada: React.Dispatch<React.SetStateAction<string>>,
    setHorarioChegada: React.Dispatch<React.SetStateAction<string>>
) {
    const viagemMarcada = await buscarViagemMarcadaPorId(id)

    if(viagemMarcada == null){
        return
    }

    const vai_no_dia = viagemMarcada.vai_no_dia == 1

    setDataViagem(viagemMarcada.data_viagem)
    setVaiNoDia(vai_no_dia)
    setPontoPartida(viagemMarcada.ponto_partida)
    setHorarioPartida(viagemMarcada.horario_partida)
    setPontoChegada(viagemMarcada.ponto_chegada)
    setHorarioChegada(viagemMarcada.horario_chegada)
}

export async function buscarViagensMarcadas(
    accessToken: Promise<string | null>,
    setViagensMarcadas: React.Dispatch<React.SetStateAction<{id: number, data_viagem: string}[]>>
){
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

export async function buscarViagensMarcadasPorMotorista(
    accessToken: Promise<string | null>,
    setViagensMarcadas: React.Dispatch<React.SetStateAction<{ id: number, nome: string, data_viagem: string }[]>>
){
    const dadosUsuario = await validarAccessToken(accessToken)
    
    if(dadosUsuario == null){
        return
    }
    
    const arrayDeViagens = await buscarTodasAsViagensMarcadasPorMotorista(dadosUsuario.id)

    if(arrayDeViagens == null){
        setViagensMarcadas([{id: 0, nome: "Vazio", data_viagem: "Vazio"}])
    } else {
        setViagensMarcadas(arrayDeViagens.map((viagem) => {
            return { id: viagem.id, nome: viagem.nome, data_viagem: viagem.data_viagem }
        }))
    }
}

export async function preencherRotaPorTurmaEData(
    id_turma: string,
    data_viagem: string,
    setOrigem: React.Dispatch<React.SetStateAction<{ horario: string, latitude: number, longitude: number }>>,
    setComponentRota: React.Dispatch<React.SetStateAction<React.JSX.Element>>
) {
    if(data_viagem == ""){
        const data_atual = new Date()

        const dia = data_atual.getDate();
        const mes = data_atual.getMonth() + 1;
        const ano = data_atual.getFullYear();

        data_viagem = `${ano}-${mes}-${dia}`;
    }
    
    const rota = await buscarCoordenadasPorTurmaEData(id_turma, data_viagem)

    if(rota == null){
        return
    }
    
    setOrigem(rota.origem)
    
    let waypointsExibidos: any[] = []
    let marcadoresWaypoints: any[] = []

    if(rota.waypoints.length > 0){
        waypointsExibidos = rota.waypoints.map(waypoint => {
            if(waypoint.latitude != 0){
                return { latitude: waypoint.latitude, longitude: waypoint.longitude }
            }
        })
        
        let I = 0
        
        marcadoresWaypoints = waypointsExibidos.map(waypoint => {
            I++
            return <Marker key={I} coordinate={waypoint}/>
        })
    }

    let apiKey: string = ""

    if(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY != null) {
        apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
    }

    const componentRota: any = (
        <>
            <Marker coordinate={rota.origem}/>
            <Marker coordinate={rota.destino}/>
            {marcadoresWaypoints}
            <MapViewDirections
                origin={{latitude: rota.origem.latitude, longitude: rota.origem.longitude}}
                destination={{latitude: rota.destino.latitude, longitude: rota.destino.longitude}}
                apikey={apiKey}
                waypoints={waypointsExibidos}
                optimizeWaypoints={true}
                splitWaypoints={true}
            />
        </>
    )

    setComponentRota(componentRota)
}

export async function gravarViagemMarcada(
    accessToken: Promise<string | null>,
    data_viagem: string,
    vai_no_dia: boolean,
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
    let latitude_partida = 0
    let longitude_partida = 0

    const localChegada = await buscarLugar(ponto_chegada)
    let latitude_chegada = 0
    let longitude_chegada = 0

    if(vai_no_dia){
        if(localPartida.status == null || localPartida.status == "ZERO_RESULTS" || localPartida.status == "INVALID_REQUEST"){
            Alert.alert("Não encontrado", "Ponto de partida não encontrado.")
            return
        }

        if(localChegada.status == null || localChegada.status == "ZERO_RESULTS" || localChegada.status == "INVALID_REQUEST"){
            Alert.alert("Não encontrado", "Ponto de chegada não encontrado.")
            return
        }

        latitude_partida = localPartida.results[0].geometry.location.lat
        longitude_partida = localPartida.results[0].geometry.location.lng

        latitude_chegada = localChegada.results[0].geometry.location.lat
        longitude_chegada = localChegada.results[0].geometry.location.lng
    }    

    const viagemMarcada = await buscarViagemMarcada(dadosUsuario.id, data_viagem)

    let sucesso = false

    if(viagemMarcada == null){
        sucesso = await cadastrarViagemMarcada(
            dadosUsuario.id,
            data_viagem,
            vai_no_dia,
            ponto_partida,
            latitude_partida,
            longitude_partida,
            horario_partida,
            ponto_chegada,
            latitude_chegada,
            longitude_chegada,
            horario_chegada
        )
    } else {
        sucesso = await atualizarViagemMarcada(
            dadosUsuario.id,
            data_viagem,
            vai_no_dia,
            ponto_partida,
            latitude_partida,
            longitude_partida,
            horario_partida,
            ponto_chegada,
            latitude_chegada,
            longitude_chegada,
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
    vai_no_dia: boolean,
    ponto_partida: string,
    horario_partida: string,
    ponto_chegada: string,
    horario_chegada: string
) {
    const localPartida = await buscarLugar(ponto_partida)
    let latitude_partida = 0
    let longitude_partida = 0

    const localChegada = await buscarLugar(ponto_chegada)
    let latitude_chegada = 0
    let longitude_chegada = 0

    if(vai_no_dia){
        if(localPartida.status == null || localPartida.status == "ZERO_RESULTS" || localPartida.status == "INVALID_REQUEST"){
            Alert.alert("Não encontrado", "Ponto de partida não encontrado.")
            return
        }

        if(localChegada.status == null || localChegada.status == "ZERO_RESULTS" || localChegada.status == "INVALID_REQUEST"){
            Alert.alert("Não encontrado", "Ponto de chegada não encontrado.")
            return
        }

        latitude_partida = localPartida.results[0].geometry.location.lat
        longitude_partida = localPartida.results[0].geometry.location.lng

        latitude_chegada = localChegada.results[0].geometry.location.lat
        longitude_chegada = localChegada.results[0].geometry.location.lng
    }

    const sucesso = await atualizarViagemMarcadaPorId(
        id,
        data_viagem,
        vai_no_dia,
        ponto_partida,
        latitude_partida,
        longitude_partida,
        horario_partida,
        ponto_chegada,
        latitude_chegada,
        longitude_chegada,
        horario_chegada
    )
    
    if(sucesso){
        Alert.alert("Sucesso", "Gravado com sucesso!")
        router.back()
    } else {
        Alert.alert("Erro", "Erro ao gravar.")
    }
}