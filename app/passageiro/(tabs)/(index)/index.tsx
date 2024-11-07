import { SafeAreaView } from "react-native-safe-area-context"
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
            <BotaoLinkComIcone title="Marcar Viagem" href="passageiro/marcar-viagem">
                <FontAwesome name={"calendar"} size={36} color="black"/>
            </BotaoLinkComIcone>
        </SafeAreaView>
    )
}