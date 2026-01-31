import { render, screen } from "@testing-library/react";
import FooterNote from "./FooterNote";
import { describe, it, expect } from "vitest";

describe("FooterNote", () => {
    it("renders the footer note text", () => {
        render(<FooterNote />);
        expect(screen.getByText(/Designed and Developed by/i)).toBeInTheDocument();
    });

    it("renders the GitHub link with correct attributes", () => {
        render(<FooterNote />);
        const link = screen.getByRole("link", { name: /iamankeshsharma/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "https://github.com/iamankeshsharma");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("applies custom class names", () => {
        render(<FooterNote className="test-class" />);
        // The component wrapper has the class, but we can check if the element exists
        // Since we don't have a testid on the wrapper, we might need to modify the component or just check if it renders without crashing with the class.
        // But for now, let's stick to checking content. Functional correctness is verified.
        // Actually, we can assume the merge works if we trust tailwind-merge, but testing the prop passing is good practice.
        // However, without a data-testid or a specific way to grab the container, straightforward class check might be tricky if we don't grab by text parent.
        const textElement = screen.getByText(/Designed and Developed by/i);
        const container = textElement.closest('div');
        expect(container).toHaveClass("test-class");
    });
});
