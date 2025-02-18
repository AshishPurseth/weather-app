import { getSession } from "@/action";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession()

  if(!session.isLoggedIn ){
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome to Home page of Weather App <b>{session.userName}</b></h1>
    </div>
  );
}
