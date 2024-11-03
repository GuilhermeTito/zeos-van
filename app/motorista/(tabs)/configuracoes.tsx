import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TextInput } from "react-native"
import { Botao } from "../../../components/Botao"
import logout from "../../../controllers/logout"
import estiloPadrao from "../../../styles/padrao"
import React, { useState } from "react"
import { preencherDadosMotorista } from "../../../controllers/motorista"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ConfiguracoesMotorista(){
    const [id, setId] = useState(0)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    
    preencherDadosMotorista(
        AsyncStorage.getItem("accessToken"),
        setId,
        setNome,
        setEmail,
        setTelefone
    )

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={{
                flex: 3,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%"
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                    paddingLeft: "5%"
                }}>
                    <Text>Id de motorista: {id}</Text>
                    <Text>Nome</Text>
                    <TextInput
                        style={estiloPadrao.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Text>E-mail</Text>
                    <TextInput
                        style={estiloPadrao.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        editable={false}
                    />
                    <Text>Telefone</Text>
                    <TextInput
                        style={estiloPadrao.input}
                        placeholder="Telefone"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <Botao title="Salvar"/>
                </View>
            </View>
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