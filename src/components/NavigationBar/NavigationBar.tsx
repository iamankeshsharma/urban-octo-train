import * as React from "react";
import { twMerge } from "tailwind-merge";

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
    return (
        <nav className="flex items-center justify-center w-full" >
            {children}
            < ul className={twMerge(`flex flex-col lg:flex-row items-center justify-center w-full gap-12 text-2xl py-7`, className)} >
                {
                    links?.map(
                        (link, index) =>
                            <li key={index} className="hover:text-accent-blue transition-colors duration-300">
                                <a href={link?.url}>{link?.name}</a>
                            </li>
                    )
                }
            </ul >
        </nav >
    );
};

export default NavigationBar;