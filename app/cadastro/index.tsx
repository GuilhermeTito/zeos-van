import { SafeAreaView } from "react-native-safe-area-context"
import { Text, Image, View } from "react-native"
import { BotaoLink } from "../../components/Botao"
import { imgLogoZeosVan } from "../../assets/imagens"

export default function IndexCadastro() {

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
                }}>Fazer cadastro como:</Text>
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
                        href="cadastro/passageiro"
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
                        href="cadastro/motorista"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}