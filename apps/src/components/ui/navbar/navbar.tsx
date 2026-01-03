import logo from "@/public/logo.png"
import Image from "next/image"

export default function Navbar(){

  return(
    <>
  <Image src={logo} alt="logo" className="absolute top-16 left-16 w-20 h-26 opacity-20"/>
    </>
  )
}
