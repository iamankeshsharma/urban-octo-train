import { twMerge } from "tailwind-merge";
import { socialLinks } from "../../constants";

type Props = {
    className?: string;
}

const FooterNote = ({ className }: Props) => {
    return (
        <div className={twMerge("w-full flex justify-center items-center py-4 text-sm text-gray-400 font-code", className)}>
            <p>
                Designed and Developed by{" "}
                <a
                    href={socialLinks[4].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-green hover:underline hover:text-white transition-colors"
                >
                    iamankeshsharma
                </a>
            </p>
        </div>
    );
};

export default FooterNote;
