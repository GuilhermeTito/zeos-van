import { SafeAreaView } from "react-native-safe-area-context"
import { Text, Image, View } from "react-native"
import React, { useState } from "react"
import { BotaoLink } from "../components/Botao"
import { imgLogoZeosVan } from "../assets/imagens"
import { verificarAccessToken } from "../controllers"

export default function Index() {
    
    const [linkPagina, setLinkPagina] = useState("")

    verificarAccessToken(setLinkPagina)

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
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <Text style={{ fontSize: 36 }}>
                    Bem vindo(a)!
                </Text>
                <BotaoLink
                    title="Entrar"
                    href={linkPagina}
                />
                <BotaoLink
                    title="Criar conta"
                    href="cadastro"
                />
            </View>
            <View style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <Text style={{ fontSize: 12 }}>
                    zeos-van@0.12.1
                </Text>
            </View>
        </SafeAreaView>
    )
}