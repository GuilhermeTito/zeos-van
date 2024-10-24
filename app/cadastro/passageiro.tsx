import { SafeAreaView } from "react-native-safe-area-context"
import { View, Image, Text, TextInput } from "react-native"
import { Botao } from "../../components/Botao"
import { useState } from "react"
import { imgLogoZeosVan } from "../../assets/imagens"
import estiloPadrao from "../../styles/padrao"
import cadastro from "../../controllers/cadastro"

export default function CadastroPassageiro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
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
                marginBottom: 16,
                textAlign: 'center'
            }}>Cadastro de Passageiro</Text>

            <TextInput
                style={estiloPadrao.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={estiloPadrao.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={estiloPadrao.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={estiloPadrao.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <Botao title="Cadastrar" onPress={() => cadastro("passageiro", nome, email, telefone, senha)}/>
        </View>
    </SafeAreaView>
  )
}