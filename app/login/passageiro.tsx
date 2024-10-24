import { SafeAreaView } from "react-native-safe-area-context"
import { Text, TextInput, Image, View } from "react-native"
import { useState } from "react"
import { imgLogoZeosVan } from "../../assets/imagens"
import { Botao } from "../../components/Botao"
import estiloPadrao from "../../styles/padrao"
import { login } from "../../controllers/login"

export default function LoginMotorista() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    
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
                alignItems: "center",
                width: "100%"
            }}>
                <Text style={{
                    fontSize: 24,
                    marginBottom: "10%"
                }}>
                    Login como Passageiro
                </Text>

                <TextInput
                    style={estiloPadrao.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <TextInput
                    style={estiloPadrao.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />

                <Botao
                    title="Entrar"
                    onPress={() => login("passageiro", email, senha)}
                />
            </View>
        </SafeAreaView>
    )
}