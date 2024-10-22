import { SafeAreaView } from "react-native-safe-area-context"
import { Text, Image, View } from "react-native"
import { imgLogoZeosVan } from "../../assets/imagens"

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
                    source={imgLogoZeosVan}
                />
            </View>
            <View style={{
                flex: 2,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center"
            }}>
                <Text>Login Passageiro</Text>
            </View>
        </SafeAreaView>
    )
}