import axios from 'axios'

const gearClient = {
    getAll: async () => {
        let response = await axios.get('/api/v1/gear/')
        return response.data
    },
    create: async (gear) => {
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

const tripClient = {
    getAll: async () => {
        let response = await axios.get('/api/v1/trip/')
        return response.data
    },
    get: async (id) => {
        let response = await axios.get(`/api/v1/trip/${id}`)
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

export default gearClient
export default tripClient
