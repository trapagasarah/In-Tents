import axios from 'axios'

const gearClient = {
    getAll: async () => {
        let response = await axios.get('/api/v1/gear/')
        return response.data
    },
    create: async (gear) => {
        console.log(gear)
        
        let response = await axios.post('/api/v1/gear/', gear)
        return response.data
    },
    update: async (gear) => {
        let response = await axios.patch(`/api/v1/gear/${gear.id}/`, gear)
        return response.data
    },
    delete: async (id) => {
        let response = await axios.delete(`/api/v1/gear/${id}/`)
        return response.data
    }
}

export default gearClient
