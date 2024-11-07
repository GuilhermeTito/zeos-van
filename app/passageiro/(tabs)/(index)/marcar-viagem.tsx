import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TextInput } from "react-native"
import React, { useState } from "react"
import { Botao } from "../../../../components/Botao"
import estiloPadrao from "../../../../styles/padrao"
import { gravarViagemMarcada } from "../../../../controllers/viagem-marcada"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function MarcarViagem(){
    const [dataViagem, setDataViagem] = useState("")
    const [pontoPartida, setPontoPartida] = useState("")
    const [horarioPartida, setHorarioPartida] = useState("")
    const [pontoChegada, setPontoChegada] = useState("")
    const [horarioChegada, setHorarioChegada] = useState("")
    
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
                <Botao title="Salvar" onPress={() => gravarViagemMarcada(AsyncStorage.getItem("accessToken"), dataViagem, pontoPartida, horarioPartida, pontoChegada, horarioChegada)}/>
            </View>
        </SafeAreaView>
    )
}