import { useEffect, useState } from "react";

export const useTypewriterEffect = (tags: string[], speed: number = 200) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentTag = (tags[currentIndex])?.replace(/ /g, "");

        const handleTyping = () => {
            setDisplayText(prev => {
                if (isDeleting) {
                    return currentTag.substring(0, prev.length - 1);
                } else {
                    return currentTag.substring(0, prev.length + 1);
                }
            });

            if (!isDeleting && displayText === currentTag) {
                setTimeout(() => setIsDeleting(true), 1500); // Pause at end of word
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % tags.length);
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentIndex, tags, speed]);

    return displayText;
}