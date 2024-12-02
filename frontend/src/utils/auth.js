import {useAuthStore} from '../store/auth'
import axios from './axios'
import jwt_decode from 'jwt_decode'
import Cookie from 'js-cookie'
import Cookies from 'js-cookie'

export const login = async (email, password) => {
    try {
        const {data, status} = await axios.post("user/token", {
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
    Cookie.remove('access_token');
    Cookie.remove('refresh_token');
    useAuthStore.getState().setUser(null)
}

export const setUser = async () => {
    const accessToken = Cookie.get('access_token')
    const refreshToken = Cookie.get('refresh_token')

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)){
        const response = await getRefreshTokenResponse(accessToken)
        setAuthUser(response.access, response.refresh)
    
    }else (
        setAuthUser(accessToken, refreshToken)
    )
}


export const setAuthUser = (accessToken, refreshToken) => {
    Cookies.set('access_token', accessToken, {
        expires: 1,
        secure: true
    }),
    Cookies.set('refresh_token', refreshToken, {
        expires: 7,
        secure: true
    })

    const user  = jwt_decode(accessToken) ?? null

    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)

}

export const getRefreshToken = async() => {
    const refreshToken = Cookies.get('refresh_token')
    const response = await axios.post('user/token/refresh/', {
        refresh: refreshToken

})

return response.data
}


export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedtoken = jwt_decode(accessToken)
        return decodedtoken.exp < Date.now() / 1000

    } catch (error) {
        console.log(error);
        return true
        
    }
    
}



