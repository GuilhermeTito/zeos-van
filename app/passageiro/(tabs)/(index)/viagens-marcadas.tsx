import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, Text } from "react-native"
import React, { useState } from "react"
import { buscarViagensMarcadas } from "../../../../controllers/viagem-marcada"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ViagensMarcadas() {
    const [viagensMarcadas, setViagensMarcadas] = useState([{data_viagem: "Vazio"}])
    buscarViagensMarcadas(AsyncStorage.getItem("accessToken"), setViagensMarcadas)

    return (
        <SafeAreaView>
            <FlatList
                data={viagensMarcadas}
                renderItem={({item}) => <Text>{item.data_viagem}</Text>}
            >
            </FlatList>
        </SafeAreaView>
    )
}