export type DadosUsuario = {
    tipoUsuario: string,
	id: number,
	nome: string,
    iat: string
}

export type RetornoToken = {
    accessToken: string
}

export async function validarAccessToken(accessToken: string | null): Promise<DadosUsuario | null> {    
    if(accessToken == null || accessToken == ""){
        return null
    }
    
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "auth/validar-token"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
    })
    
    const req = new Request(
        reqURL,
        {
            method: "GET",
            headers: reqHeaders
        }
    )

    const res = await fetch(req)

    const resBody = await res.json()

    return resBody
}

export async function validarLogin(tipoUsuario: string, email: string, senha: string): Promise<RetornoToken | null> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "auth/" + tipoUsuario

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        email: email,
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

    const resBody = await res.json()
    
    return resBody
}