import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native"
import { Botao, BotaoComIcone } from "../../../../components/Botao"
import { buscarTurmas, excluirTurma, novaTurma } from "../../../../controllers/turma"
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

export default function Turmas(){
    const [turmas, setTurmas] = useState([{id: 0, nome: "Vazio"}])
    const [nome, setNome] = useState("")
    
    buscarTurmas(AsyncStorage.getItem("accessToken"), setTurmas)

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
                    <Botao title="Adicionar" style={estilo.botaoAdicionar} onPress={() => {
                        if(nome != "") {
                            novaTurma(AsyncStorage.getItem("accessToken"), nome)
                            setNome("")    
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
                                <Botao
                                    title={item.nome}
                                    style={estilo.botaoTurma}
                                />
                                <BotaoComIcone
                                    style={estilo.botaoDeletar}
                                    onPress={() => excluirTurma(item.id)}
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