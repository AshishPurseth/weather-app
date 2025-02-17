'use server'
import {defaultSession, ISessionData, sessionOptions} from '@/lib'
import { getIronSession } from 'iron-session'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const getSession = async ()=>{
    const session = await getIronSession<ISessionData>(await cookies(), sessionOptions)

    if(!session.isLoggedIn){
        session.isLoggedIn = defaultSession.isLoggedIn
    }

    return session
}
export const login = async (formData:FormData)=>{

    const session = await getSession()

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // check db connection

    if(username !== 'ipgAutomotive' || !password){
        return {error: 'wrong credential'}
    }

    session.userId = "1"
    session.userName = username
    session.isLoggedIn = true
    await session.save()
    redirect('/')
}
export const logout = async ()=>{
    const session = await getSession()
    session.destroy()
    redirect('/login')
}