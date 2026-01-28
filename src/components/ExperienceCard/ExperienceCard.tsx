import { twMerge } from "tailwind-merge";
import { experiences } from "../../constants";


type props = {
    className?: string;
    children?: React.ReactNode;
    position?: 'left' | 'right';
    data?: typeof experiences[0];
}

const ExperienceCard = ({ data, className, children, position = 'left' }: props) => {
    return (
        <div className={twMerge("relative w-full border border-secondary py-2 px-4 rounded-md ring ring-white/10", className)}>
            {children}
            <div className={twMerge("hidden lg:flex absolute top-1/2 -translate-y-1/2 items-center", position === 'left' ? '-left-[50px]' : '-right-[50px]')}>
                <span className="bg-white size-4 rounded-full border" />
                <div className="w-6 h-0 border" />
                <span className="bg-white size-4 rounded-full border" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-2">
                    <span className="text-sm">{data?.duration?.from} - <mark className="bg-transparent text-accent-yellow">{data?.duration?.to}</mark></span>
                    <h2 className="text-md wrap-break-word">{data?.position} at <mark className="bg-transparent text-accent-blue font-semibold">{data?.company}</mark></h2>
                </div>
                <ul className="text-sm list-disc list-outside px-5 py-3">
                    {
                        data?.description?.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))
                    }
                </ul>
            </div>
        </div >
    )
};

export default ExperienceCard;