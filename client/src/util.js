import axios from 'axios'

export async function getAllGear(){
    let response = await axios.get('/api/v1/gear')
    console.log(response)
    return response.data
}