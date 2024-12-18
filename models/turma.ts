export async function buscarTurma(id: string) {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "turma/")
    
    const queryParams = {
        id: id
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

export async function buscarTodasAsTurmas(id_motorista: number) {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "turma/todas")
    
    const queryParams = {
        id_motorista: id_motorista
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

export async function cadastrarTurma(id_motorista: number, nome: string): Promise<boolean> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "turma"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        id_motorista: id_motorista,
        nome: nome
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

export async function atualizarTurma(id: string, id_passageiro_origem: string, id_passageiro_destino: string): Promise<boolean> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "turma"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        id: id,
        id_passageiro_origem: id_passageiro_origem,
        id_passageiro_destino: id_passageiro_destino
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

    if(res.status == 200){
        return true
    }
    
    return false
}

export async function deletarTurma(id: number): Promise<boolean> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "turma"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        id: id
    })
    
    const req = new Request(
        reqURL,
        {
            method: "DELETE",
            headers: reqHeaders,
            body: reqBody
        }
    )

    const res = await fetch(req)

    if(res.status == 200){
        return true
    }
    
    return false
}

export async function buscarPassageirosDaTurma(id_turma: string) {
    const reqURL = new URL(process.env.EXPO_PUBLIC_API_URL + "passageiro-turma/todos")

    const queryParams = {
        id_turma: id_turma
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