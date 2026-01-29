import { twMerge } from "tailwind-merge";
import { projects } from "../../constants";

type props = {
    project: typeof projects[0];
    className?: string;
    children?: React.ReactNode;
}

const ProjectCard = ({ project, className, children }: props) => {
    return (
        <div className={twMerge(`w-full lg:w-96 flex flex-col justify-start border border-gray-500 rounded-lg p-5 gap-3`, className)}>
            {children}
            <h2 className="text-xl font-bold">{project?.name}</h2>
            <div className="relative w-full h-full flex flex-col justify-between items-evenly">
                <div className="flex flex-col gap-2">
                    <p className="text-sm h-20 overflow-hidden text-clip">{project?.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project?.tags?.map((tag, index) => (
                            <span key={index} className="text-xs rounded-full border border-gray-500 px-2 py-1 whitespace-nowrap text-gray-500">{tag}</span>
                        ))}
                    </div>
                </div>
                <a href={project?.link} target="_blank" rel="noopener noreferrer" className="hover:border-accent-blue transition-all duration-300 border-b py-1 w-fit">
                    codebase
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;