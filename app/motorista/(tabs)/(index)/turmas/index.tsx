import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native"
import { Botao, BotaoComIcone, BotaoLink, BotaoLinkComIcone } from "../../../../../components/Botao"
import { buscarTurmas, excluirTurma, novaTurma } from "../../../../../controllers/turma"
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome from "@expo/vector-icons/FontAwesome"

const estilo = StyleSheet.create({
    botaoAdicionar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "#15D100",
        margin: 10
    },
    botaoTurma: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "#FFD000",
        margin: 10,
        width: "65%"
    },
    botaoDeletar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "#FF0000",
        margin: 10
    },
    botaoMapa: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "#FFD000",
        margin: 10
    },
    input: {
        height: 40,
        width: "40%",
        borderColor: '#CCCCCC',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        marginBottom: 12
    }
})

export default function Turmas(){
    const [turmas, setTurmas] = useState([{id: 0, nome: "Vazio"}])
    const [nome, setNome] = useState("")
    const [jaCarregada, seJaCarregada] = useState(false)
    
    if(!jaCarregada){
        buscarTurmas(AsyncStorage.getItem("accessToken"), setTurmas)
        seJaCarregada(true)
    }
    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%"
                }}
            >
                <Text style={{ marginLeft: "5%" }}>
                    Nome
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <TextInput
                        style={estilo.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Botao title="Adicionar" style={estilo.botaoAdicionar} onPress={async () => {
                        if(nome != "") {
                            await novaTurma(AsyncStorage.getItem("accessToken"), nome)
                            setNome("")
                            buscarTurmas(AsyncStorage.getItem("accessToken"), setTurmas)   
                        }
                    }}/>
                </View>
            </View>
            <View
                style={{
                    flex: 5,
                    width: "100%"
                }}
            >
                <FlatList
                    data={turmas}
                    renderItem={({item}) => {
                        return (
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <BotaoLinkComIcone
                                    style={estilo.botaoMapa}
                                    href={"motorista/mapa/" + item.id}
                                >
                                    <FontAwesome name={"map"} size={36} color="black"/>
                                </BotaoLinkComIcone>
                                <BotaoLink
                                    title={item.nome}
                                    style={estilo.botaoTurma}
                                    href={"motorista/turmas/" + item.id}
                                />
                                <BotaoComIcone
                                    style={estilo.botaoDeletar}
                                    onPress={async () => {
                                        await excluirTurma(item.id)
                                        buscarTurmas(AsyncStorage.getItem("accessToken"), setTurmas)
                                    }}
                                >
                                    <FontAwesome name={"trash"} size={36} color="black"/>
                                </BotaoComIcone>
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}