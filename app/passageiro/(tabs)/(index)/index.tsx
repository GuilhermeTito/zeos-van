import { SafeAreaView } from "react-native-safe-area-context"
import { BotaoComIcone, BotaoLinkComIcone } from "../../../../components/Botao"
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function IndexPassageiro(){
    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
        }}>
            <BotaoComIcone title="Marcar viagem">
                <FontAwesome name={"calendar"} size={36} color="black"/>
            </BotaoComIcone>
        </SafeAreaView>
    )
}