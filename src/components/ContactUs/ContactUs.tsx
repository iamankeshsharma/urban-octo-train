import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { submitContactForm } from "../../api/contact";

type props = {
    id?: string;
    className?: string;
    children?: React.ReactNode;
}

interface FormErrors {
    email?: string;
    message?: string;
    turnstile?: string;
    general?: string;
}

const ContactUs = ({ id, className, children }: props) => {
    const widgetId = useRef<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        message: "",
    });
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<{ success: boolean; message: string } | null>(null);

    useEffect(() => {
        if (typeof turnstile === 'undefined') return;

        // Clean up previous instance if it exists (safety check)
        if (widgetId.current) {
            turnstile.remove(widgetId.current);
            widgetId.current = null;
        }

        try {
            widgetId.current = turnstile.render("#turnstile-container", {
                sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
                callback: function (token: string) {
                    setTurnstileToken(token);
                    setErrors((prev) => ({ ...prev, turnstile: undefined }));
                },
                errorCallback: function (error: unknown) {
                    console.log("Error:", error);
                    setTurnstileToken(null);
                    // Just reset on error, don't remove unless unmounting
                    if (widgetId.current) turnstile.reset(widgetId.current);
                },
                "expired-callback": function () {
                    setTurnstileToken(null);
                }
            });
        } catch (error) {
            console.error("Turnstile render error:", error);
        }

        return () => {
            if (widgetId.current && typeof turnstile !== 'undefined') {
                turnstile.remove(widgetId.current);
                widgetId.current = null;
            }
        };
    }, []);

    // Auto-dismiss status message after 5 seconds
    useEffect(() => {
        if (submissionStatus) {
            const timer = setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [submissionStatus]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        if (!turnstileToken) {
            newErrors.turnstile = "Please complete the security challenge";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus(null);

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await submitContactForm({
                email: formData.email,
                message: formData.message,
                token: turnstileToken!
            });

            if (response.success) {
                setSubmissionStatus({ success: true, message: response.message || "Message sent successfully!" });
                setFormData({ email: "", message: "" });
                setTurnstileToken(null);
                if (widgetId.current) turnstile.reset(widgetId.current);
            } else {
                setSubmissionStatus({ success: false, message: response.message || "Failed to send message. Please try again." });
            }
        } catch (error) {
            setSubmissionStatus({ success: false, message: "An unexpected error occurred. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id={id} className={twMerge(`w-full h-screen flex flex-col justify-evenly items-between py-20 px-5 lg:px-60 gap-10`, className)}>
            <h2 className="text-2xl font-bold text-accent-green">&lt;ContactUs /&gt;</h2>
            <div className="flex justify-center items-center px-4 md:px-40">
                <form className="w-full flex flex-col gap-6 md:gap-10 md:px-40 py-10 md:py-20" onSubmit={handleSubmit} noValidate>
                    {submissionStatus && (
                        <div className={`p-4 rounded ${submissionStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {submissionStatus.message}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xl">Email</label>
                        <input type="email" name="email" id="email" placeholder="username@gmail.com"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: undefined });
                            }}
                            className={`w-full text-neutral-900 p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xl">Message Here</label>
                        <textarea name="message" id="message" placeholder="Your message here..."
                            value={formData.message}
                            onChange={(e) => {
                                setFormData({ ...formData, message: e.target.value });
                                if (errors.message) setErrors({ ...errors, message: undefined });
                            }}
                            className={`w-full text-neutral-900 h-32 p-2 border rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                        {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <div id="turnstile-container"></div>
                        {errors.turnstile && <span className="text-red-500 text-sm">{errors.turnstile}</span>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-5 py-2 text-lg font-semibold rounded transition-colors ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-gray-200'
                                }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            {children}
        </section>
    );
};

export default ContactUs;
