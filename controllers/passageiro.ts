import { validarAccessToken } from "../models/auth"
import { buscarPassageiro } from "../models/passageiro"

export async function preencherDadosPassageiro(accessToken: Promise<string | null>, setId: React.Dispatch<React.SetStateAction<number>>, setNome: React.Dispatch<React.SetStateAction<string>>, setEmail: React.Dispatch<React.SetStateAction<string>>, setTelefone: React.Dispatch<React.SetStateAction<string>>, setPontoPartida: React.Dispatch<React.SetStateAction<string>>, setHorarioPartida: React.Dispatch<React.SetStateAction<string>>, setPontoChegada: React.Dispatch<React.SetStateAction<string>>, setHorarioChegada: React.Dispatch<React.SetStateAction<string>>) {
    const dadosUsuario = await validarAccessToken(accessToken)

    if(dadosUsuario == null){
        return
    }

    const passageiro = await buscarPassageiro(dadosUsuario.id)

    if(passageiro != null) {
        setId(passageiro.id)
        setNome(passageiro.nome)
        setEmail(passageiro.email)
        setTelefone(passageiro.telefone)
        setPontoPartida(passageiro.ponto_partida_padrao)
        setHorarioPartida(passageiro.horario_partida_padrao)
        setPontoChegada(passageiro.ponto_chegada_padrao)
        setHorarioChegada(passageiro.horario_chegada_padrao)
    }
}