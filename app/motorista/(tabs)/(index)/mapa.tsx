import React, { useState } from "react"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { StyleSheet, View } from "react-native"
import { preencherRotaPorTurmaEData } from '../../../../controllers/viagem-marcada'

const estilo = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mapa: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default function Mapa() {
    const [origem, setOrigem] = useState({ horario: "00:00", latitude: 0, longitude: 0 })
    const [componenteRota, setComponentRota] = useState((<></>))
    const [jaCarregada, setJaCarregada] = useState(false)

    if(!jaCarregada){
        preencherRotaPorTurmaEData("10", "2024-11-25", setOrigem, setComponentRota)
        setJaCarregada(true)
    }
    
    return (
        <View style={estilo.container}>
            <MapView
                style={estilo.mapa}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: origem.latitude,
                    longitude: origem.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            {componenteRota}
            </MapView>
        </View>
    )
}