import { Pressable, StyleSheet, GestureResponderEvent, Text, StyleProp, TextStyle, ViewStyle } from "react-native"
import { Link } from "expo-router"

const estilo = StyleSheet.create({
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "30%",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "#FFD000"
    },
    texto: {
        fontSize: 24,
        color: "black"
    }
})

type PropsBotao = {
    title: string,
    titleStyle?: StyleProp<TextStyle>,
    style?: StyleProp<ViewStyle>,
    onPress?: (event: GestureResponderEvent) => void
}

export function Botao(props: PropsBotao) {
    let { title, titleStyle, style, onPress } = props

    if (titleStyle == null) titleStyle = estilo.texto
    if (style == null) style = estilo.botao

    return (
        <Pressable style={style} onPress={onPress}>
            <Text style={titleStyle}>{title}</Text>
        </Pressable>
    )
}

type PropsBotaoLink = PropsBotao & { href: string }

export function BotaoLink(props: PropsBotaoLink) {
    let { title, titleStyle, style, onPress, href } = props
    
    if (titleStyle == null) titleStyle = estilo.texto
    if (style == null) style = estilo.botao

    return (
        <Link href={href}>
            <Pressable style={style} onPress={onPress}>
                <Text style={titleStyle}>{title}</Text>
            </Pressable>
        </Link>   
    )
}