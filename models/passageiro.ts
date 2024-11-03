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