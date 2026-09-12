import Link from "next/link"
import Image from "next/image"

import Logo from "../public/logo.png"

export default function Navbar() {
  return (
    <nav className="w-full bg-[#1565C0] p-2 flex flex-col items-center justify-center text-white">
      <div className="w-[85%] flex row items-center justify-between">
        <Link href={"/"}>
            <Image 
              src={Logo} 
              width={125} 
              height={125} 
              alt="Logo da empresa"
            />
          </Link>

          <div>
            <Link href={"/Localization"}>
                Previsão do tempo
            </Link>
          </div>
      </div>
    </nav>
  )
}