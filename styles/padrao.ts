import { StyleSheet } from "react-native"

const estiloPadrao = StyleSheet.create({
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "#FFD000",
        margin: 10
    },
    input: {
        height: 40,
        width: "90%",
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        marginBottom: 12
    }
})

export default estiloPadrao