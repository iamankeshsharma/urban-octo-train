import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ContactUs from "./ContactUs";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as contactApi from "../../api/contact";

// Mock the API module
vi.mock("../../api/contact", () => ({
    submitContactForm: vi.fn(),
}));

describe("ContactUs", () => {
    // Setup Turnstile mock
    const mockTurnstile = {
        render: vi.fn((_selector: unknown, _options: { callback: (token: string) => void }) => {
            // Simulate successful render by storing the callback and returning a widget ID
            // We can manually trigger the callback if we want to simulate captcha completion
            return "widget-id-123";
        }),
        remove: vi.fn(),
        reset: vi.fn(),
    };

    beforeEach(() => {
        // @ts-expect-error - Mocking turnstile on window
        window.turnstile = mockTurnstile;
        vi.clearAllMocks();
    });

    afterEach(() => {
        // @ts-expect-error - Deleting turnstile from window
        delete window.turnstile;
    });

    it("renders the contact form", () => {
        render(<ContactUs />);
        expect(screen.getByRole("heading", { name: /<ContactUs \/>/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    });

    it("initializes turnstile widget", () => {
        render(<ContactUs />);
        expect(mockTurnstile.render).toHaveBeenCalledWith("#turnstile-container", expect.any(Object));
    });

    it("shows validation errors when submitting empty form", async () => {
        render(<ContactUs />);
        const submitBtn = screen.getByRole("button", { name: /Submit/i });

        fireEvent.click(submitBtn);

        expect(await screen.findByText("Email is required")).toBeInTheDocument();
        expect(await screen.findByText("Message is required")).toBeInTheDocument();
        expect(await screen.findByText("Please complete the security challenge")).toBeInTheDocument();
    });

    it("shows email validation error for invalid email", async () => {
        render(<ContactUs />);
        const emailInput = screen.getByLabelText(/Email/i);
        const submitBtn = screen.getByRole("button", { name: /Submit/i });

        fireEvent.change(emailInput, { target: { value: "invalid-email" } });
        fireEvent.click(submitBtn);

        expect(await screen.findByText("Please enter a valid email address")).toBeInTheDocument();
    });

    it("submits the form successfully when inputs are valid", async () => {
        // Setup API mock for success
        vi.mocked(contactApi.submitContactForm).mockImplementation(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return { success: true, message: "Message sent successfully!" };
        });

        render(<ContactUs />);
        
        // Fill form
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Hello world" } });

        // Simulate Turnstile completion
        // We need to capture the callback passed to turnstile.render and call it
        const renderCall = mockTurnstile.render.mock.calls[0];
        const options = renderCall[1];
        
        await act(async () => {
             options.callback("mock-token");
        });

        // Click submit
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        // Check loading state
        expect(await screen.findByRole("button", { name: /Sending.../i })).toBeInTheDocument();

        // Check API call
        await waitFor(() => {
            expect(contactApi.submitContactForm).toHaveBeenCalledWith({
                email: "test@example.com",
                message: "Hello world",
                token: "mock-token"
            });
        });

        // Check success message
        expect(await screen.findByText("Message sent successfully!")).toBeInTheDocument();
        
        // Check form reset
        expect((screen.getByLabelText(/Email/i) as HTMLInputElement).value).toBe("");
        expect((screen.getByLabelText(/Message/i) as HTMLTextAreaElement).value).toBe("");
    });

    it("handles API failure", async () => {
        // Setup API mock for failure
        vi.mocked(contactApi.submitContactForm).mockImplementation(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return { success: false, message: "Server error" };
        });

        render(<ContactUs />);
        
        // Fill form and simulate token
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Hello world" } });

        const renderCall = mockTurnstile.render.mock.calls[0];
        const options = renderCall[1];
        
        await act(async () => {
            options.callback("mock-token");
        });

        // Click submit
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        // Check loading state
        expect(await screen.findByRole("button", { name: /Sending.../i })).toBeInTheDocument();

        // Check API call
        await waitFor(() => {
            expect(contactApi.submitContactForm).toHaveBeenCalledWith({
                email: "test@example.com",
                message: "Hello world",
                token: "mock-token"
            });
        });

        // Check error message
        expect(await screen.findByText("Server error")).toBeInTheDocument();
    });
});
