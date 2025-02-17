'use client'
import { login } from '@/action'
import custom from '@/styles/custom.module.css'
import { useFormState } from 'react-dom'

const Login = () => {

    const [state, formAction] = useFormState<any,FormData>(login, undefined) 

  return (
    <form className={custom.form} action={formAction}>
        <input type="text" name='username' required placeholder='user name' />
        <input type="password" name='password' required placeholder='password' />
        <button>Login</button>
        {state?.error && <p>{state?.error}</p>}
    </form>
  )
}

export default Login