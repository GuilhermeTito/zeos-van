import { SafeAreaView } from "react-native-safe-area-context"
import { Text, Image, View } from "react-native"
import { BotaoLink } from "../../components/Botao"
import { imgLogoZeosVan } from "../../assets/imagens"

export default function IndexLogin() {

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <View style={{
                flex: 2,
                width: "100%"
            }}>
                <Image
                    style={{
                        width: "80%",
                        resizeMode: "contain",
                        alignSelf: "center"
                    }}
                    source={imgLogoZeosVan}
                />
            </View>
            <View style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 36
                }}>Entrar como:</Text>
            </View>
            <View style={{
                flex: 4,
                flexDirection: "row",
                alignItems: "flex-start"
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <BotaoLink
                        title="Passageiro"
                        href="login/passageiro"
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <BotaoLink
                        title="Motorista"
                        href="login/motorista"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}