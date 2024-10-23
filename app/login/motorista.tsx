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
    const [msgErroLogin, setMsgErroLogin] = useState("")
    
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
                    Motorista
                </Text>
                <Text style={{ fontSize: 24 }}>E-mail</Text>
                <TextInput
                    style={estiloPadrao.input}
                    onChangeText={setEmail}
                />
                <Text style={{ fontSize: 24 }}>Senha</Text>
                <TextInput
                    style={estiloPadrao.input}
                    onChangeText={setSenha}
                />
                <Botao
                    title="Entrar"
                    onPress={() => login("motorista", email, senha, setMsgErroLogin)}
                />
                <Text style={{
                    fontSize: 24,
                    color: "red",
                    marginTop: "10%"
                }}
                >{msgErroLogin}</Text>
            </View>
        </SafeAreaView>
    )
}