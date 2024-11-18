import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList } from "react-native"
import { BotaoLink } from "../../../../../components/Botao"
import AsyncStorage from "@react-native-async-storage/async-storage"
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
                            href={"motorista/calendario/" + item.id}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}