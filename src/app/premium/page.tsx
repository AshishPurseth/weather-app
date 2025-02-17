import { getSession } from "@/action"
import { redirect } from "next/navigation"

const Premium = async () => {
  const session = await getSession()
  
    if(!session.isLoggedIn ){
      redirect('/login')
    }
  return (
    <div>Premium</div>
  )
}

export default Premium