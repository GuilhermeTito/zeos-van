export default async function cadastrarPassageiro(nome: string, email: string, telefone: string, senha: string): Promise<boolean> {
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