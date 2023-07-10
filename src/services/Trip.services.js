import axios from 'axios'

class TripService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/trip`

        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }


    getTrip({ tripData }) {
        return this.api.get(`/${tripData.origin}/${tripData.destination}/${tripData.date}/${tripData.originId}/${tripData.destinationId}`)
    }


    save(tripData) {
        return this.api.post('/', tripData)
    }


}

const tripService = new TripService()

export default tripService