import { render, screen } from "@testing-library/react";
import NavigationBar from "./NavigationBar";
import { describe, expect, test } from "vitest";

describe("NavigationBar", () => {
    test("render the navigation bar", () => {
        render(<NavigationBar links={[
            {
                name: "Home",
                url: "#home"
            },
            {
                name: "Experience",
                url: "#experience"
            },
            {
                name: "Projects",
                url: "#projects"
            },
            {
                name: "Contact Us",
                url: "#contact"
            }
        ]} />);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Experience")).toBeInTheDocument();
        expect(screen.getByText("Projects")).toBeInTheDocument();
        expect(screen.getByText("Contact Us")).toBeInTheDocument();
    });
});