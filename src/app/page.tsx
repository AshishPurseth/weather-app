import { getSession } from "@/action";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession()

  if(!session.isLoggedIn ){
    redirect('/login')
  }

  return (
    <div>
      Welcome to Home page of Weather App
    </div>
  );
}
