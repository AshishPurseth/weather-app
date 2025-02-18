
import Link from "next/link";
import Logout from "./logoutForm";
import { getSession } from "@/action";
import Image from "next/image";
import custom from '@/styles/custom.module.css'
import ipgLogo from "../../public/ipg-automotive-logo.png";

const Navbar = async () => {
  const session = await getSession();
  return (
    <nav className={custom.nav}>
      <section>
        <Image alt="logo" src={ipgLogo} width={150} height={50} />
      </section>
      <section className={custom.nav_inner_2}>
        <Link href='/'>Home</Link>
        <Link href='/countries'>Countries</Link>
        {session.isLoggedIn ? <Logout /> : <Link href='/login'>Login</Link>}
      </section>
    </nav>
  );
};

export default Navbar;
