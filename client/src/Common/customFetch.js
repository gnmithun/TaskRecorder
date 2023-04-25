export const customFetch = async (endpoint,options) => {
    const defaultHeaders = {
        headers: {'Content-Type': 'application/json'},
        credentials:"include",                                              
        mode:'cors'
    }
    const result = await fetch(endpoint,{...options,...defaultHeaders})
    return result
}