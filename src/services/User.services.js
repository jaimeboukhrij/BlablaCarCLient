import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`

        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }


    getUser(idUser) {
        return this.api.get(`/${idUser}`)
    }

    editUserAvatar(data) {
        return this.api.put(`/editUserAvatar`, data)
    }

    editUSerpersonalData(editUSerpersonalData) {
        return this.api.put(`/editUSerpersonalData`, editUSerpersonalData)
    }




}

const userService = new UserService()

export default userService