import { twMerge } from "tailwind-merge";
import { useTypewriterEffect } from "../../Hooks/utilities";
import { tags, skills } from "../../constants";

type props = {
    className?: string;
    children?: React.ReactNode;
    id?: string;
}

const HeroSection = ({ id, className, children }: props) => {
    return (
        <section id={id} className={twMerge(`w-full h-screen flex flex-col items-between justify-evenly lg:justify-center`, className)}>
            {children}

            <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-6/7 lg:h-3/4 p-4">
                {/* Hero*/}
                <div className="flex items-center justify-center lg:w-1/2 lg:h-2/3 p-10">
                    {/* Image */}
                    <img src="./assets/user.jpeg" className="size-70 lg:size-96 rounded-full" alt="profile photo of ankesh" />
                </div>
                <div className="flex flex-col items-center justify-start lg:justify-center w-full lg:w-1/2 lg:h-2/3">
                    {/* Text */}
                    <h1 className="lg:text-9xl text-3xl font-thin text-center">ANKESH SHARMA</h1>
                    <div className="lg:text-3xl text-xl flex gap-1">
                        <p className="flex items-center justify-center h-full overflow-hidden">
                            &lt;{useTypewriterEffect(tags, 200)}
                            <span className="animate-ping bg-white border-l border-white h-full"></span>
                            /&gt;</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                {/* Techstack row */}
                <div className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-center w-fit gap-4">
                    {skills?.map((Skill, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <Skill />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection;