import axios from "axios"

const baseUrl = "https://localhost:7118/api/Categories"

//Retrieves all categories from the API
const getAll = () => {

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {getAll}