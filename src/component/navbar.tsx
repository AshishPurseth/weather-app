import Link from "next/link"
import Logout from "./logoutForm"
import { getSession } from "@/action"

const Navbar = async () => {

    const session = await getSession()
  return (
    <nav>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/premium">Premium</Link>      
        {session.isLoggedIn ? <Logout/> : <Link href="/login">Login</Link>}
    </nav>
  )
}

export default Navbar