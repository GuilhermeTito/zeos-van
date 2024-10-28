import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "react-native"
import { Botao } from "../../../components/Botao"
import logout from "../../../controllers/logout"

export default function ConfiguraçõesMotorista(){
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <Botao title="Sair" onPress={() => logout()}/>
            </View>
        </SafeAreaView>
    )
}