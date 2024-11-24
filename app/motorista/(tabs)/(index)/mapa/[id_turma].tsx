import React, { useContext, useState } from "react"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { StyleSheet, View, Text, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { preencherRotaPorTurmaEData } from '../../../../../controllers/viagem-marcada'
import { useLocalSearchParams } from "expo-router"
import { Botao } from "../../../../../components/Botao"

const estilo = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mapa: {
        ...StyleSheet.absoluteFillObject,
    },
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

export default function Mapa() {
    const { id_turma } = useLocalSearchParams()
    const [data, setData] = useState("")
    const [origem, setOrigem] = useState({ horario: "00:00", latitude: 0, longitude: 0 })
    const [componenteRota, setComponentRota] = useState((<></>))
    const [jaCarregada, setJaCarregada] = useState(false)

    let idString: string = ""
    
    if(Array.isArray(id_turma)){
        idString = id_turma[0]
    } else {
        idString = id_turma
    }

    if(!jaCarregada){
        preencherRotaPorTurmaEData(idString, data, setOrigem, setComponentRota)
        setJaCarregada(true)
    }
    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%"
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
                    Data:
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
                        placeholder="Data"
                        value={data}
                        onChangeText={setData}
                    />
                    <Botao title="Carregar Rota" style={estilo.botaoAdicionar} onPress={async () => {
                        if(data != "") {
                            preencherRotaPorTurmaEData(idString, data, setOrigem, setComponentRota)
                        }
                    }}/>
                </View>
            </View>
            <View
                style={{
                    flex: 6,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%"
                }}
            >
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
            </View>            
        </SafeAreaView>
    )
}