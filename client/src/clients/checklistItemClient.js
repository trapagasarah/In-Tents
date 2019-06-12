import axios from 'axios'

const checklistItemClient = {
    getAll: async () => {
        let response = await axios.get('/api/v1/checklistitems/')
        return response.data
    },
    create: async (checklistItem) => {
        console.log(checklistItem)
        let response = await axios.post('/api/v1/checklistitems/', checklistItem)
        return response.data
    },
    update: async (checklistItem) => {
        let response = await axios.patch(`/api/v1/checklistitems/${checklistItem.id}/`, checklistItem)
        return response.data
    },
    delete: async (id) => {
        let response = await axios.delete(`api/v1/checklistitems/${id}/`)
        return response.data
    }
}

export default checklistItemClient 