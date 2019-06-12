import axios from 'axios'

const tripClient = {
    getAll: async () => {
        let response = await axios.get('/api/v1/trips/')
        return response.data
    },
    get: async (id) => {
        let response = await axios.get(`/api/v1/trips/${id}/`)
        console.log(response)
        return response.data
    },
    create: async (trip) => {
        let response = await axios.post('/api/v1/trips/', trip)
        return response.data
    },
    update: async (trip) => {
        let response = await axios.patch(`/api/v1/trips/${trip.id}/`, trip)
        return response.data
    },
    delete: async (id) => {
        let response = await axios.delete(`/api/v1/trips/${id}/`)
        console.log(response)
        return response.data
    }
}

export default tripClient