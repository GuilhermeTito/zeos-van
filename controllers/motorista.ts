import { validarAccessToken } from "../models/auth"
import { buscarMotorista } from "../models/motorista"

export async function preencherDadosMotorista(accessToken: Promise<string | null>, setId: React.Dispatch<React.SetStateAction<number>>, setNome: React.Dispatch<React.SetStateAction<string>>, setEmail: React.Dispatch<React.SetStateAction<string>>, setTelefone: React.Dispatch<React.SetStateAction<string>>) {
    const dadosUsuario = await validarAccessToken(accessToken)

    if(dadosUsuario == null){
        return
    }

    const motorista = await buscarMotorista(dadosUsuario.id)

    if(motorista != null) {
        setId(motorista.id)
        setNome(motorista.nome)
        setEmail(motorista.email)
        setTelefone(motorista.telefone)
    }
}