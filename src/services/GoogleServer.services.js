import axios from 'axios'

class GoogleServer {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/google`
        })

    }

    autocomplete(query) {
        return this.api.get(`/autocomplete/${query}`)
    }


}

const googleServer = new GoogleServer()

export default googleServer