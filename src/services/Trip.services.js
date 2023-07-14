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
        return this.api.get(`/${tripData.origin}/${tripData.destination}/${tripData.date}/${tripData.originId}/${tripData.destinationId}/${tripData.passengers}`)
    }

    getOneTrip(idTrip) {
        return this.api.get(`/${idTrip}`)
    }

    getOwnerTrips(idUser) {
        return this.api.get(`/owner/${idUser}`)
    }

    save(tripData) {
        return this.api.post('/', tripData)
    }

    tripRequest(data) {
        return this.api.put(`/tripRequest`, data)
    }


    tripPassengers(data) {
        return this.api.put(`/passengers`, data)
    }

    getUserTrips(idUser) {
        return this.api.get(`/userTrips/${idUser}`)

    }



}

const tripService = new TripService()

export default tripService