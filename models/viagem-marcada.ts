export async function buscarViagemMarcada(id_passageiro: number, data_viagem: string) {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "viagem-marcada/all")
    
    const queryParams = {
        id_passageiro: id_passageiro,
        data_viagem: data_viagem
    }
    
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

    try {
        return await res.json()
    } catch (error) {
        console.log(error)
        return
    }
}

export async function buscarViagemMarcadaPorId(id: string) {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "viagem-marcada")
    
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

    try {
        return await res.json()
    } catch (error) {
        console.log(error)
        return
    }
}

export async function buscarTodasAsViagensMarcadas(id_passageiro: number) {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "viagem-marcada/todas")
    
    const queryParams = {
        id_passageiro: id_passageiro
    }
    
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

    try {
        return await res.json()
    } catch (error) {
        console.log(error)
        return
    }
}

export async function cadastrarViagemMarcada(
    id_passageiro: number,
    data_viagem: string,
    vai_no_dia: boolean,
    ponto_partida: string,
    latitude_partida: number,
    longitude_partida: number,
    horario_partida: string,
    ponto_chegada: string,
    latitude_chegada: number,
    longitude_chegada: number,
    horario_chegada: string
): Promise<boolean> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "viagem-marcada"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        id_passageiro: id_passageiro,
        data_viagem: data_viagem,
        vai_no_dia: vai_no_dia,
        ponto_partida: ponto_partida,
        latitude_partida: latitude_partida,
        longitude_partida: longitude_partida,
        horario_partida: horario_partida,
        ponto_chegada: ponto_chegada,
        latitude_chegada: latitude_chegada,
        longitude_chegada: longitude_chegada,
        horario_chegada: horario_chegada
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

    return res.status == 201
}

export async function atualizarViagemMarcada(
    id_passageiro: number,
    data_viagem: string,
    vai_no_dia: boolean,
    ponto_partida: string,
    latitude_partida: number,
    longitude_partida: number,
    horario_partida: string,
    ponto_chegada: string,
    latitude_chegada: number,
    longitude_chegada: number,
    horario_chegada: string
): Promise<boolean> {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "viagem-marcada")
    
    const queryParams = {
        id_passageiro: id_passageiro,
        data_viagem: data_viagem
    }
    
    Object.keys(queryParams).forEach(key => reqURL.searchParams.append(key, queryParams[key]))

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })

    const reqBody = JSON.stringify({
        data_viagem: data_viagem,
        vai_no_dia: vai_no_dia,
        ponto_partida: ponto_partida,
        latitude_partida: latitude_partida,
        longitude_partida: longitude_partida,
        horario_partida: horario_partida,
        ponto_chegada: ponto_chegada,
        latitude_chegada: latitude_chegada,
        longitude_chegada: longitude_chegada,
        horario_chegada: horario_chegada
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

export async function atualizarViagemMarcadaPorId(
    id: string,
    data_viagem: string,
    vai_no_dia: boolean,
    ponto_partida: string,
    latitude_partida: number,
    longitude_partida: number,
    horario_partida: string,
    ponto_chegada: string,
    latitude_chegada: number,
    longitude_chegada: number,
    horario_chegada: string
): Promise<boolean> {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "viagem-marcada")
    
    const queryParams = {
        id: id
    }
    
    Object.keys(queryParams).forEach(key => reqURL.searchParams.append(key, queryParams[key]))

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })

    const reqBody = JSON.stringify({
        data_viagem: data_viagem,
        vai_no_dia: vai_no_dia,
        ponto_partida: ponto_partida,
        latitude_partida: latitude_partida,
        longitude_partida: longitude_partida,
        horario_partida: horario_partida,
        ponto_chegada: ponto_chegada,
        latitude_chegada: latitude_chegada,
        longitude_chegada: longitude_chegada,
        horario_chegada: horario_chegada
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