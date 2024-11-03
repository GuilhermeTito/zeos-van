export async function buscarPassageiro(id: number) {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "passageiro")
    
    const queryParams = { id: id }
    
    Object.keys(queryParams).forEach(key => reqURL.searchParams.append(key, queryParams[key]))

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const req = new Request(
        reqURL,
        {
            method: "GET",
            headers: reqHeaders
        }
    )

    const res = await fetch(req)
    
    return await res.json()
}

export async function cadastrarPassageiro(nome: string, email: string, telefone: string, senha: string): Promise<boolean> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "passageiro"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha
    })
    
    const req = new Request(
        reqURL,
        {
            method: "POST",
            headers: reqHeaders,
            body: reqBody
        }
    )

    const res = await fetch(req)

    if(res.status == 201){
        return true
    }
    
    return false
}

export async function atualizarPassageiro(
    id: number,
    nome: string,
    telefone: string,
    ponto_partida_padrao: string,
    latitude_partida_padrao: string,
    longitude_partida_padrao: string,
    horario_partida_padrao: string,
    ponto_chegada_padrao: string,
    latitude_chegada_padrao: string,
    longitude_chegada_padrao: string,
    horario_chegada_padrao: string
): Promise<Boolean> {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "passageiro")
    
    const queryParams = { id: id }
    
    Object.keys(queryParams).forEach(key => reqURL.searchParams.append(key, queryParams[key]))

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })

    const reqBody = JSON.stringify({
        nome: nome,
        telefone: telefone,
        ponto_partida_padrao: ponto_partida_padrao,
        latitude_partida_padrao: latitude_partida_padrao,
        longitude_partida_padrao: longitude_partida_padrao,
        horario_partida_padrao: horario_partida_padrao,
        ponto_chegada_padrao: ponto_chegada_padrao,
        latitude_chegada_padrao: latitude_chegada_padrao,
        longitude_chegada_padrao: longitude_chegada_padrao,
        horario_chegada_padrao: horario_chegada_padrao
    })
    
    const req = new Request(
        reqURL,
        {
            method: "PATCH",
            headers: reqHeaders,
            body: reqBody
        }
    )

    const res = await fetch(req)
    
    return res.status == 200
}