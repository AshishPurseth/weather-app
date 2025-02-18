'use client'
import { login } from '@/action'
import custom from '@/styles/custom.module.css'
import { useActionState } from 'react'

const Login = () => {

    const [state, formAction] = useActionState<any,FormData>(login, undefined) 

  return (
    <main className={custom.main_form}>
    <form className={custom.form} action={formAction}>
        <input type="text" name='username' required placeholder='user name' />
        <input type="password" name='password' required placeholder='password' />
        <button>Login</button>
        {state?.error && <p>{state?.error}</p>}
    </form>
    </main>
  )
}

export default Login