import axios from 'axios'

const apiInstance = axios.create({

    baseURL: 'https://localhost:8000/api/v1/',
    timeout: 4000,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json   ',
    }   

})


export default apiInstance