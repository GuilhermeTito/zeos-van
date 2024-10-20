import { SafeAreaView } from "react-native-safe-area-context"
import { Text, Image, View } from "react-native"
import { BotaoLink } from "../components/Botao"

export default function Index() {
    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <View style={{
                flex: 1,
                width: "100%"
            }}>
                <Image
                    style={{
                        width: "80%",
                        resizeMode: "contain",
                        alignSelf: "center"
                    }}
                    source={require("../assets/img/logo-zeos-van.png")}
                />
            </View>            
            <View style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <Text style={{ fontSize: 36 }}>
                    Bem vindo(a)!
                </Text>
                <BotaoLink
                    title="Iniciar"
                    href=""
                />
            </View>
            <View style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <Text style={{ fontSize: 12 }}>
                    zeos-van@0.2.0
                </Text>
            </View>
        </SafeAreaView>
    )
}