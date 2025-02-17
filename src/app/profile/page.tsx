import { getSession } from "@/action"
import { redirect } from "next/navigation"

const Profile = async () => {
  const session = await getSession()
  
    if(!session.isLoggedIn ){
      redirect('/login')
    }
  return (
    <div>Profile</div>
  )
}

export default Profile