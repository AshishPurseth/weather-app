import { getSession } from "@/action"
import Wells from "@/component/wells"
import { redirect } from "next/navigation"
import custom from '@/styles/custom.module.css'

const Countries = async () => {
  const session = await getSession()
  
    if(!session.isLoggedIn ){
      redirect('/login')
    }
  return (
    <div className={custom.country_container}>
      <Wells/>
    </div>
  )
}

export default Countries