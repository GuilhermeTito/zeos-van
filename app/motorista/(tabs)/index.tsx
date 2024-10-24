import { SafeAreaView } from "react-native-safe-area-context"
import { BotaoComIcone, BotaoLinkComIcone } from "../../../components/Botao"
import FontAwesome from "@expo/vector-icons/FontAwesome"

export default function IndexMotorista(){
    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
        }}>
            <BotaoComIcone title="Turmas">
                <FontAwesome name={"users"} size={36} color="black"/>
            </BotaoComIcone>
            
            <BotaoComIcone title="Calendário">
                <FontAwesome name={"calendar"} size={36} color="black"/>
            </BotaoComIcone>
            
            <BotaoLinkComIcone title="Mapa" href="motorista/mapa">
                <FontAwesome name={"map"} size={36} color="black"/>
            </BotaoLinkComIcone>
        </SafeAreaView>
    )
}