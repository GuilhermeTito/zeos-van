import { Pressable, StyleSheet, GestureResponderEvent, Text, StyleProp, TextStyle, ViewStyle } from "react-native"
import { Link } from "expo-router"
import estiloPadrao from "../styles/padrao"

const estiloTexto = StyleSheet.create({
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

    if (titleStyle == null) titleStyle = estiloTexto.texto
    if (style == null) style = estiloPadrao.botao

    return (
        <Pressable style={style} onPress={onPress}>
            <Text style={titleStyle}>{title}</Text>
        </Pressable>
    )
}

type PropsBotaoLink = PropsBotao & { href: string }

export function BotaoLink(props: PropsBotaoLink) {
    let { title, titleStyle, style, onPress, href } = props
    
    if (titleStyle == null) titleStyle = estiloTexto.texto
    if (style == null) style = estiloPadrao.botao

    return (
        <Link href={href} asChild>
            <Pressable style={style} onPress={onPress}>
                <Text style={titleStyle}>{title}</Text>
            </Pressable>
        </Link>   
    )
}