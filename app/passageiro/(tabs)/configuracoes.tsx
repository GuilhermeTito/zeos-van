import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TextInput } from "react-native"
import { Botao } from "../../../components/Botao"
import logout from "../../../controllers/logout"
import estiloPadrao from "../../../styles/padrao"
import React, { useState } from "react"
import { preencherDadosPassageiro, gravarAlteracoesPassageiro } from "../../../controllers/passageiro"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ConfiguracoesPassageiro(){
    const [paginaJaCarregada, setPaginaJaCarregada] = useState(false)
    const [id, setId] = useState(0)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [pontoPartida, setPontoPartida] = useState("")
    const [horarioPartida, setHorarioPartida] = useState("")
    const [pontoChegada, setPontoChegada] = useState("")
    const [horarioChegada, setHorarioChegada] = useState("")

    if(!paginaJaCarregada){
        preencherDadosPassageiro(
            AsyncStorage.getItem("accessToken"),
            setId,
            setNome,
            setEmail,
            setTelefone,
            setPontoPartida,
            setHorarioPartida,
            setPontoChegada,
            setHorarioChegada
        )
        setPaginaJaCarregada(true)
    }
    
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                paddingLeft: "5%"
            }}>
                <Text>Id de passageiro: {id}</Text>
                <Text>Nome</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <Text>E-mail</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    editable={false}
                />
                <Text>Telefone</Text>
                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
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
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <Botao title="Salvar" onPress={() => gravarAlteracoesPassageiro(
                        AsyncStorage.getItem("accessToken"),
                        nome,
                        telefone,
                        pontoPartida,
                        horarioPartida,
                        pontoChegada,
                        horarioChegada,
                    )}/>
                    <Botao title="Sair" onPress={() => logout()}/>
                </View>
            </View>
        </SafeAreaView>
    )
}