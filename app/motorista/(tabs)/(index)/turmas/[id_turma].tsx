import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Botao, BotaoComIcone } from "../../../../../components/Botao"
import { buscarPassageiros, adicionarPassageiro, removerPassageiro  } from "../../../../../controllers/turma"
import { useLocalSearchParams } from "expo-router"
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
        width: "80%"
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

export default function Turma(){
    const { id_turma } = useLocalSearchParams()
    const [idPassageiro, setIdPassageiro] = useState("")
    const [passageiros, setPassageiros] = useState([{ id_passageiro: 0, passageiro: { nome: "Vazio" } }])
    const [jaCarregada, seJaCarregada] = useState(false)
        
    let idString: string

    if(Array.isArray(id_turma)){
        idString = id_turma[0]
    } else {
        idString = id_turma
    }

    if(!jaCarregada){
        buscarPassageiros(idString, setPassageiros)
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
                    ID do Passageiro
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
                        placeholder="ID"
                        value={idPassageiro}
                        onChangeText={setIdPassageiro}
                        inputMode="numeric"
                    />
                    <Botao title="Adicionar" style={estilo.botaoAdicionar} onPress={async () => {
                        if(idPassageiro != "") {
                            await adicionarPassageiro(idString, idPassageiro)
                            setIdPassageiro("")
                            buscarPassageiros(idString, setPassageiros)
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
                    data={passageiros}
                    renderItem={({item}) => {
                        return (
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <Botao
                                    title={item.id_passageiro + " - " + item.passageiro.nome}
                                    style={estilo.botaoTurma}
                                />
                                <BotaoComIcone
                                    style={estilo.botaoDeletar}
                                    onPress={async () => {
                                        await removerPassageiro(idString, item.id_passageiro)
                                        buscarPassageiros(idString, setPassageiros)
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