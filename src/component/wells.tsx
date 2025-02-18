import { countries } from "@/lib/constants"
import Link from "next/link"

const Wells = () => {
  return (
    <>
    {countries.map((country, index) => (
                <Link key={index} href={`/countries/${encodeURIComponent(country)}`}>
                    <h3>{country}</h3>
                </Link>
            ))}
    </>
  )
}

export default Wells