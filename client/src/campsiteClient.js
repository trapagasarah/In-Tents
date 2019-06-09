import axios from 'axios'

const campsiteClient = {
    getAll: async () => {
        let response = await axios.get('/api/v1/campsites/')
        return response.data
    },
    get: async (id) => {
        let response = await axios.get(`/api/v1/campsites/${id}/`)
        return response.data
    },
    create: async (campsite) => {
        let response = await axios.post('/api/v1/campsites/', campsite)
        return response.data
    },
    update: async (campsite) => {
        let response = await axios.patch(`/api/v1/campsites/${campsite.id}/`, campsite)
        return response.data
    },
    delete: async (id) => {
        let response = await axios.delete(`/api/v1/campsites/${id}/`)
        return response.data
    }
}

export default campsiteClient