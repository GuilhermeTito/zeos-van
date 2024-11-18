import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native"
import { Botao, BotaoComIcone, BotaoLink } from "../../../../../components/Botao"
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { buscarViagensMarcadasPorMotorista } from "../../../../../controllers/viagem-marcada"

export default function Calendario(){
    const [viagensMarcadas, setViagensMarcadas] = useState([{ id: 0, nome: "Vazio", data_viagem: "Vazio" }])
    const [jaCarregada, seJaCarregada] = useState(false)
    
    if(!jaCarregada){
        buscarViagensMarcadasPorMotorista(AsyncStorage.getItem("accessToken"), setViagensMarcadas)
        seJaCarregada(true)
    }
    
    return (
        <SafeAreaView>
            <FlatList
                data={viagensMarcadas}
                renderItem={({item}) => {
                    return (
                        <BotaoLink
                            title={item.nome + " - " + item.data_viagem}
                            href={"motorista/turmas/" + item.id}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}