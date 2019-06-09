import axios from 'axios'

const tripClient = {
    getAll: async () => {
        let response = await axios.get('/api/v1/trip/')
        return response.data
    },
    get: async (id) => {
        let response = await axios.get(`/api/v1/trip/${id}/`)
        return response.data
    },
    create: async (trip) => {
        let response = await axios.post('/api/v1/trip/', trip)
        return response.data
    },
    update: async (trip) => {
        let response = await axios.patch(`/api/v1/trip/${trip.id}/`, trip)
        return response.data
    },
    delete: async (id) => {
        let response = await axios.get (`/api/v1/trip/${id}/`)
        return response.data
    }
}

export default tripClient