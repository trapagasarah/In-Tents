import axios from 'axios'

const googleClient = {
    findCampsites: async (searchText) => {
        let key = process.env.REACT_APP_IN_TENTS_GOOGLE_TOKEN
        let response  = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${key}&inputtype=textquery&input=${searchText}`)
    }
}