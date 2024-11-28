import axios from 'axios'

const apiInstance = axios.create({

    baseURL: 'https://localhost:80000/api/v1/',
    timeout: 5000,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json   ',
    }   

})


export default apiInstance