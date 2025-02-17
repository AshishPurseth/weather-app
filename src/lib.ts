import {SessionOptions} from 'iron-session'

export interface ISessionData{
    userId?:string,
    userName?:string,
    isLoggedIn:boolean
}

export const defaultSession: ISessionData = {
    isLoggedIn:false
}

export const sessionOptions:SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: 'ipgAutomotive',
    cookieOptions:{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production'
    }
}