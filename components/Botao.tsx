import React from "react"
import { StyleSheet, GestureResponderEvent, Text, StyleProp, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { Link } from "expo-router"
import estiloPadrao from "../styles/padrao"
import { PropsWithChildren } from "react"

const estiloTexto = StyleSheet.create({
    texto: {
        fontSize: 24,
        color: "black"
    },
    textoBotaoComIcone: {
        fontSize: 36,
        color: "black",
        marginLeft: 20
    }
})

type PropsBotao = {
    title?: string,
    titleStyle?: StyleProp<TextStyle>,
    style?: StyleProp<ViewStyle>,
    onPress?: (event: GestureResponderEvent) => void
}

export function Botao(props: PropsBotao) {
    let { title, titleStyle, style, onPress } = props

    if (titleStyle == null) titleStyle = estiloTexto.texto
    if (style == null) style = estiloPadrao.botao

    let componenteTitulo: any
    
    if (title != null && title != "") {
        componenteTitulo = <Text style={titleStyle}>{title}</Text>
    }

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {componenteTitulo}
        </TouchableOpacity>
    )
}

type PropsBotaoLink = PropsBotao & { href: string }

export function BotaoLink(props: PropsBotaoLink) {
    let { title, titleStyle, style, onPress, href } = props
    
    if (titleStyle == null) titleStyle = estiloTexto.texto
    if (style == null) style = estiloPadrao.botao

    let componenteTitulo: any
    
    if (title != null && title != "") {
        componenteTitulo = <Text style={titleStyle}>{title}</Text>
    }

    return (
        <Link href={href} asChild>
            <TouchableOpacity style={style} onPress={onPress}>
                {componenteTitulo}
            </TouchableOpacity>
        </Link>
    )
}

type PropsBotaoComIcone = PropsBotao & PropsWithChildren

export function BotaoComIcone(props: PropsBotaoComIcone) {
    let { title, titleStyle, style, onPress } = props

    if (titleStyle == null) titleStyle = estiloTexto.textoBotaoComIcone
    if (style == null) style = estiloPadrao.botaoComIcone

    let componenteTitulo: any
    
    if (title != null && title != "") {
        componenteTitulo = <Text style={titleStyle}>{title}</Text>
    }

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {props.children}
            {componenteTitulo}
        </TouchableOpacity>
    )
}

type PropsBotaoLinkComIcone = PropsBotaoLink & PropsWithChildren

export function BotaoLinkComIcone(props: PropsBotaoLinkComIcone) {
    let { title, titleStyle, style, onPress, href } = props

    if (titleStyle == null) titleStyle = estiloTexto.textoBotaoComIcone
    if (style == null) style = estiloPadrao.botaoComIcone

    let componenteTitulo: any
    
    if (title != null && title != "") {
        componenteTitulo = <Text style={titleStyle}>{title}</Text>
    }

    return (
        <Link href={href} asChild>
            <TouchableOpacity style={style} onPress={onPress}>
                {props.children}
                {componenteTitulo}
            </TouchableOpacity>
        </Link>
    )
}