export async function cadastrarPassageiroTurma(id_turma: string, id_passageiro: string): Promise<boolean> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "passageiro-turma"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        id_turma: id_turma,
        id_passageiro: id_passageiro
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

export async function deletarPassageiroTurma(id_turma: string, id_passageiro: number): Promise<boolean> {
    const reqURL = process.env.EXPO_PUBLIC_API_URL + "passageiro-turma"

    const reqHeaders = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    
    const reqBody = JSON.stringify({
        id_turma: id_turma,
        id_passageiro: id_passageiro
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