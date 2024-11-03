export async function buscarLugar(query: string){
    const reqURL = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json")
    
    const queryParams = {
        query: query,
        key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
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

    return await res.json()
}