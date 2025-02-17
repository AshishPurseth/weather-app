
import { getSession } from "@/action";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  return (
    <>{session.isLoggedIn ? <div>Welcome to Home page of Weather App</div> : redirect('/login')}</>
  );
}
