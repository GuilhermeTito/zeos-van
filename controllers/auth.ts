type DadosUsuario = {
    tipoUsuario: string,
	id: number,
	nome: string
}

export async function validarAccessToken(accessToken: string | null): Promise<DadosUsuario | null> {
    // Temporário
    
    if(accessToken == null || accessToken == ""){
        return null
    }
    
    return {
        tipoUsuario: "motorista",
	    id: 1,
	    nome: "teste"
    }
}