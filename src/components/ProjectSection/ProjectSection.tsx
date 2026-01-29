import { twMerge } from "tailwind-merge";
import { projects } from "../../constants";
import ProjectCard from "../ProjectCard";

type props = {
    id?: string;
    data?: typeof projects;
    className?: string;
    children?: React.ReactNode;
}

const ProjectSection = ({ id, data, className, children }: props) => {
    return (
        <section id={id} className={twMerge(`w-full flex flex-col justify-between items-between py-20 px-5 lg:px-60 gap-10`, className)}>
            {children}
            <h2 className="text-2xl font-bold text-accent-green">&lt;Projects /&gt;</h2>
            <div className="w-full flex flex-wrap justify-evenly gap-10">
                {data?.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    )
};

export default ProjectSection;