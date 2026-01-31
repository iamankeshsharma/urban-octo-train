import { socialLinks } from "../../constants";

type props = {
    data: typeof socialLinks;
    className?: string;
}

const Footer = ({ data, className }: props) => {
    return (
        <footer className={className}>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-center w-fit gap-4">
                    {data?.map((item, index) => (
                        <a key={index} href={item.url} target="_blank" className="flex items-center justify-center">
                            <item.icon />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
