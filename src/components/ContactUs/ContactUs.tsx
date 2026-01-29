import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type props = {
    id?: string;
    className?: string;
    children?: React.ReactNode;
}

const ContactUs = ({ id, className, children }: props) => {
    const widgetId = useRef<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        message: "",
    });
    const turnstileRendered = useRef(false);

    useEffect(() => {
        if (turnstileRendered.current) return;
        turnstileRendered.current = true;

        widgetId.current = turnstile.render("#turnstile-container", {
            sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
            callback: function (token: string) {
                console.log("Success:", token);
            },
            errorCallback: function (error: any) {
                console.log("Error:", error);
                turnstile.reset(widgetId.current || "");
            },
        });
    }, []);

    return (
        <section id={id} className={twMerge(`w-full h-screen flex flex-col justify-start items-between py-20 px-5 lg:px-60 gap-10`, className)}>
            {children}
            <h2 className="text-2xl font-bold text-accent-green">&lt;ContactUs /&gt;</h2>
            <div className="flex justify-center items-center px-40">
                <form className="w-full flex flex-col gap-10 px-40 py-20" action="">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xl">Email</label>
                        <input type="email" name="email" id="email" placeholder="username@gmail.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full text-neutral-900 p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xl">Message Here</label>
                        <textarea name="message" id="message" placeholder="Your message here..."
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full text-neutral-900 h-32 p-2 border border-gray-300 rounded"></textarea>
                    </div>
                    <div id="turnstile-container"></div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-5 py-2 bg-white text-lg font-semibold text-black rounded"
                            onClick={(e) => { e.preventDefault(); console.log(formData) }}>Submit</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactUs;
