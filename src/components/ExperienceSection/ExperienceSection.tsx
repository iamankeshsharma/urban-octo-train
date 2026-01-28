import { twMerge } from "tailwind-merge";
import ExperienceCard from "../ExperienceCard";
import { experiences } from "../../constants";

type props = {
    className?: string;
    children?: React.ReactNode;
    data?: typeof experiences;
};

const ExperienceSection = ({ data, className, children }: props) => {
    return (
        <section className={twMerge(`w-full flex flex-col justify-between items-between px-5 lg:px-60 gap-10`, className)}>
            {children}
            <h2 className="text-2xl font-bold text-accent-green">&lt;Experience /&gt;</h2>
            <div className="relative flex h-full w-full">
                <div className="flex flex-col justify-evenly gap-10 w-full">
                    {
                        data?.map((item, index) => (
                            <div key={index} className={twMerge("flex justify-center", index % 2 !== 0 ? "justify-start lg:justify-end lg:ml-20" : "justify-start lg:mr-20")}>
                                <ExperienceCard className="w-full lg:w-1/2" data={item} position={
                                    index % 2 !== 0 ? "left" : "right"
                                } />
                            </div>
                        ))
                    }
                </div>

                <div className="hidden lg:flex absolute top-0 lg:left-1/2 lg:-translate-x-1/2 h-full border">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 size-3 rounded-full border bg-white"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-3 rounded-full border bg-white"></div>
                </div>
            </div>
        </section>
    )
};
export default ExperienceSection;