import {useAuthStore} from '../store/auth'
import axios from './axios'
import jwt_decode from 'jwt_decode'
import Cookie from 'js-cookie'

export const login = (email, password) => {
    try {
        const {data, status} = axios.post("user/token", {
            email,
            password,
        })

        if (status ===200){
            setAuthUser(data.access, data.refresh)
        }
        return {data, error: null}
        } catch (error){
            return {
                data: null,
                error: error.response.data?.detail || 'something went wrong'

            };
        }

    }


export const register = async (full_name, email, phone , password, password2) => {
 try {
    const {data} = await axios.post('user/register',{
        full_name, 
        email,
        phone,
        password,
        password2
    })

    await login(email, password)


    return {data, error: null}

 } catch (error) {
     return {
         data: null,
         error: error.response.data?.detail || 'something went wrong'

     };
 }
    
}

export const logout =() => {
    Cookie.remove('access_token'),
    Cookie.remove('refresh_token'),
    useAuthStore.getState().setUser(null)
}




