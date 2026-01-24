import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type link = {
    name: string;
    url: string;
};

type props = {
    children?: React.ReactNode,
    links: link[],
    className?: string
}

const NavigationBar = ({ className, children, links }: props) => {
    const [openHamburger, setOpenHamburger] = useState(false);
    return (
        <>
            <button onClick={() => setOpenHamburger(!openHamburger)} className="lg:hidden fixed right-10 top-10 text-6xl font-thin cursor-pointer flex flex-col gap-2">
                {
                    !openHamburger &&
                    <>
                        <span className="block h-1 w-8 bg-white"></span>
                        <span className="block h-1 w-8 bg-white"></span>
                        <span className="block h-1 w-8 bg-white"></span>
                    </>
                }
            </button >

            {
                < nav className={twMerge(`flex-col items-center justify-center h-screen lg:h-auto w-full`, className, openHamburger ? 'flex' : 'hidden lg:block')} >
                    {children}
                    < ul className="relative rounded-lg bg-gray-900 shadow-2xl lg:shadow-none lg:bg-transparent flex flex-col lg:flex-row items-center justify-center h-1/2 w-1/2 lg:w-full gap-12 text-2xl lg:py-7" >
                        < button onClick={() => setOpenHamburger(!openHamburger)}
                            className="absolute top-5 right-8 lg:hidden text-6xl font-thin cursor-pointer flex flex-col gap-2 rotate-45" >
                            +
                        </button >
                        {
                            links?.map(
                                (link, index) =>
                                    <li onClick={() => setOpenHamburger(!openHamburger)} key={index} className="hover:text-accent-blue transition-colors duration-300">
                                        <a href={link?.url}>{link?.name}</a>
                                    </li>
                            )
                        }
                    </ul >
                </nav >
            }
        </>
    );
};

export default NavigationBar;