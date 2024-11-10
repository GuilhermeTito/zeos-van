import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TextInput } from "react-native"
import React, { useState } from "react"
import { Botao } from "../../../../components/Botao"
import estiloPadrao from "../../../../styles/padrao"
import { gravarViagemMarcadaPorId, preencherDadosViagem } from "../../../../controllers/viagem-marcada"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLocalSearchParams } from "expo-router"
import Checkbox from "expo-checkbox"

export default function ExibirViagem(){
    const [paginaJaCarregada, setPaginaJaCarregada] = useState(false)
    const { id_viagem } = useLocalSearchParams()
    const [dataViagem, setDataViagem] = useState("")
    const [vaiNoDia, setVaiNoDia] = useState(false)
    const [pontoPartida, setPontoPartida] = useState("")
    const [horarioPartida, setHorarioPartida] = useState("")
    const [pontoChegada, setPontoChegada] = useState("")
    const [horarioChegada, setHorarioChegada] = useState("")

    let idString: string

    if(Array.isArray(id_viagem)){
        idString = id_viagem[0]
    } else {
        idString = id_viagem
    }

    if(!paginaJaCarregada){
        preencherDadosViagem(
            idString,
            setDataViagem,
            setVaiNoDia,
            setPontoPartida,
            setHorarioPartida,
            setPontoChegada,
            setHorarioChegada
        )
        setPaginaJaCarregada(true)
    }    

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
        }}>
            <View style={{
                flex: 5,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                paddingLeft: "5%"
            }}>
                <Text>Data da Viagem</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Ponto de partida"
                    value={dataViagem}
                    onChangeText={setDataViagem}
                />
                <Text>Vai no dia:</Text>
                <Checkbox
                    style={{
                        margin: 8
                    }}
                    value={vaiNoDia}
                    onValueChange={setVaiNoDia}
                    color={vaiNoDia ? '#4630EB' : undefined}
                />
                <Text>Ponto de partida</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Ponto de partida"
                    value={pontoPartida}
                    onChangeText={setPontoPartida}
                />
                <Text>Horário de partida</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Horário de partida"
                    value={horarioPartida}
                    onChangeText={setHorarioPartida}
                />
                <Text>Ponto de chegada</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Ponto de chegada"
                    value={pontoChegada}
                    onChangeText={setPontoChegada}
                />
                <Text>Horário de chegada</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Horário de chegada"
                    value={horarioChegada}
                    onChangeText={setHorarioChegada}
                />
            </View>
            
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
            }}>
                <Botao title="Salvar" onPress={() => gravarViagemMarcadaPorId(idString, dataViagem, vaiNoDia, pontoPartida, horarioPartida, pontoChegada, horarioChegada)}/>
            </View>
        </SafeAreaView>
    )
}