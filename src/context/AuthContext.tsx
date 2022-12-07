import React, { createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces'
import { authReducer, AuthState } from './AuthReducer'
import cafeApi from '../api/cafeApi'

export type AuthContextProps = {
    status: 'checking' | 'authenticated' | 'not-authenticated'
    token: string | null
    user: Usuario | null
    errorMessage: string
    signUp: (registerObj:RegisterData) => void
    signIn: (LoginObj:LoginData) => void
    logOut: () => void
    removeError: () => void
}

const authInitial:AuthState = {
    status:'checking',
    token:null,
    user:null,
    errorMessage:''
}

export const AuthContext = createContext({} as AuthContextProps)

export const  AuthProvider = ({children}: {children: JSX.Element | JSX.Element[]})=>{

    const [state,dispatch] = useReducer(authReducer,authInitial)

    useEffect(() => {
        checkToken()
    }, [])
    
    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if(!token) return dispatch({type:'notAuthenticated'})

            const resp = await cafeApi.get('/auth')

            if(resp.status!==200){
                return dispatch({type:'notAuthenticated'})
            }

            await AsyncStorage.setItem('token',resp.data.token)

            dispatch({type:'signUp',payload:{
                token:resp.data.token,
                user:resp.data.usuario
            }})

        } catch (error) {
            console.log(error)
        }  
    }

    const signUp = async ({nombre,correo,password}:RegisterData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/usuarios',{nombre,correo,password})

            dispatch({type:'signUp',payload:{
                token:resp.data.token,
                user:resp.data.usuario
            }})

            await AsyncStorage.setItem('token',resp.data.token)

        } catch (error:any) {
            dispatch({type:'addError', payload: error.response.data.errors[0].msg ?? 'Informacion incorrecta' })
        }
    }

    const signIn = async ({correo,password}:LoginData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/auth/login',{correo,password})
            dispatch({type:'signUp',payload:{
                token:resp.data.token,
                user:resp.data.usuario
            }})

            await AsyncStorage.setItem('token',resp.data.token)

        } catch (error:any) {
            dispatch({type:'addError', payload: error.response.data.msg ?? 'Informacion incorrecta' })
        }
    }

    const logOut = async () => {
        dispatch({type:'logout'})
        await AsyncStorage.removeItem('token')

    }

    const removeError = () => {
        dispatch({type:'removeError'})
    }

    const data = {...state,signUp,signIn,logOut, removeError}

    return (
        <AuthContext.Provider value={ data } >
            { children }
        </AuthContext.Provider>
    )
}