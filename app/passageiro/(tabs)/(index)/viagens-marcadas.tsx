import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, Text } from "react-native"
import React, { useState } from "react"
import { buscarViagensMarcadas } from "../../../../controllers/viagem-marcada"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Botao, BotaoLink } from "../../../../components/Botao"

export default function ViagensMarcadas() {
    const [viagensMarcadas, setViagensMarcadas] = useState([{id: 0, data_viagem: "Vazio"}])
    buscarViagensMarcadas(AsyncStorage.getItem("accessToken"), setViagensMarcadas)

    return (
        <SafeAreaView>
            <FlatList
                data={viagensMarcadas}
                renderItem={({item}) => {
                    return (
                        <BotaoLink title={item.data_viagem} href={"passageiro/" + item.id}/>
                    )
                }}
            >
            </FlatList>
        </SafeAreaView>
    )
}