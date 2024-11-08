import { SafeAreaView } from "react-native-safe-area-context"
import React from "react"
import { BotaoLinkComIcone } from "../../../../components/Botao"
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function IndexPassageiro(){
    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
        }}>
            <BotaoLinkComIcone title="Viagens Marcadas" href="passageiro/viagens-marcadas">
                <FontAwesome name={"calendar"} size={36} color="black"/>
            </BotaoLinkComIcone>
            <BotaoLinkComIcone title="Marcar Viagem" href="passageiro/marcar-viagem">
                <FontAwesome name={"plus-circle"} size={36} color="black"/>
            </BotaoLinkComIcone>
        </SafeAreaView>
    )
}