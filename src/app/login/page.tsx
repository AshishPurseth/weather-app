import { login } from '@/action'
import custom from '@/styles/custom.module.css'

const Login = () => {
  return (
    <form className={custom.form} action={login}>
        <input type="text" name='username' required placeholder='user name' />
        <input type="password" name='password' required placeholder='password' />
        <button>Login</button>
    </form>
  )
}

export default Login