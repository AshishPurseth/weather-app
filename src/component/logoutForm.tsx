import { logout } from "@/action"

const Logout = () => {
  return (
    <form action={logout}>
        <button>Logout</button>
    </form>
  )
}

export default Logout