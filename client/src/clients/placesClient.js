import axios from 'axios'

const placesClient = {
    findPlacesNear: async (location) => {
        let lat = location.lat
        let lng = location.lng
        let response  = await axios.get(`/api/v1/places?lat=${lat}&lng=${lng}`)
        return response.data.results
    }
}

export default placesClient