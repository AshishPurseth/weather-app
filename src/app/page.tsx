
import { getSession } from "@/action";
import MultiSelect from "@/component/multiSelect";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getSession()

  if(!session.isLoggedIn ){
    redirect('/login')
  }

  return (
    <>
      <h1>Welcome to Home page of Weather App <mark>{session.userName}</mark></h1>
      <MultiSelect session={session}/>
      
    </>
  );
}
