import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, View, StyleSheet } from "react-native"
import React, { useState } from "react"
import { buscarViagensMarcadas, excluirViagemMarcada } from "../../../../controllers/viagem-marcada"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BotaoComIcone, BotaoLink } from "../../../../components/Botao"
import FontAwesome from "@expo/vector-icons/FontAwesome"

const estilo = StyleSheet.create({
    botaoViagemMarcada: {
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
    }
})

export default function ViagensMarcadas() {
    const [viagensMarcadas, setViagensMarcadas] = useState([{id: 0, data_viagem: "Vazio"}])
    const [jaCarregada, seJaCarregada] = useState(false)
    
    if(!jaCarregada){
        buscarViagensMarcadas(AsyncStorage.getItem("accessToken"), setViagensMarcadas)
        seJaCarregada(true)
    }

    return (
        <SafeAreaView>
            <FlatList
                data={viagensMarcadas}
                renderItem={({item}) => {
                    return (
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <BotaoLink
                                title={item.data_viagem}
                                style={estilo.botaoViagemMarcada}
                                href={"passageiro/" + item.id}
                            />
                            <BotaoComIcone
                                style={estilo.botaoDeletar}
                                onPress={async () => {
                                    await excluirViagemMarcada(item.id)
                                    buscarViagensMarcadas(AsyncStorage.getItem("accessToken"), setViagensMarcadas)
                                }}
                            >
                                <FontAwesome name={"trash"} size={36} color="black"/>
                            </BotaoComIcone>
                        </View>                        
                    )
                }}
            />
        </SafeAreaView>
    )
}