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
export const login = async (currentState:{error: undefined | string}, formData:FormData)=>{

    const session = await getSession()

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (!username || !password) {
        return { error: "Username and password are required" };
    }

    const response = await fetch('http://localhost:3000/api/users',{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({username, password})
    })

    if (!response.ok) {
        return { error: "Login failed" };
    }

    let user;
    try {
        user = await response.json();
    } catch (error) {
        return { error: "Failed to parse response: " + error.message };
    }
    console.log('🍏',user)
    if (!user.username) {
        return { error: "User not found or invalid credentials" };
    }

    session.userId = user._id
    session.userName = user.username
    session.isLoggedIn = true
    await session.save()
    redirect('/')
}
export const logout = async ()=>{
    const session = await getSession()
    session.destroy()
    redirect('/login')
}