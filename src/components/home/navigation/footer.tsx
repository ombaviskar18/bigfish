import Icons from "@/components/global/icons"
import { Heart } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import Ic from "../../../../public/icons/icon.gif";


const Footer = () => {
    return (
        <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">

            <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
            <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>

            <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">

            </div>
            <div className=" border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between ">
            <Image src={Ic} alt="CryptoConnect Logo" width={30} height={30} /> 
                    <span className="text-lg ml-2 font-medium">
                                BigFish
                     </span>
                     <span className="text-neutral-200 text-sm flex items-center">
                        : Designed by Pioneers
                        <Heart className="w-3.5 h-3.5 ml-1 fill-red-800 text-red" />
                    </span>
            </div>
            {/* <div className=" border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between ">
            <span className="text-neutral-200 text-sm flex items-center">
                        Designed by Pioneers
                        <Heart className="w-3.5 h-3.5 ml-1 fill-red-800 text-red" />
                    </span>
            </div> */}
            <div className=" border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between ">
               <p className="text-sm text-muted-foreground mt-8 md:mt-0">
                    &copy; {new Date().getFullYear()} BigFish INC. All rights reserved.
                </p>
            </div>

        </footer>
    )
}

export default Footer
