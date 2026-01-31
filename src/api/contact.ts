export interface ContactRequest {
    email: string;
    message: string;
    token: string;
}

export interface ContactResponse {
    success: boolean;
    message?: string;
}

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/contact`;

export const submitContactForm = async (data: ContactRequest): Promise<ContactResponse> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            // Try to parse error message from response if available
            try {
                const errorData = await response.json();
                return {
                    success: false,
                    message: errorData.message || `Error: ${response.status} ${response.statusText}`
                };
            } catch {
                return {
                    success: false,
                    message: `Error: ${response.status} ${response.statusText}`
                };
            }
        }

        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("API Error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Network error occurred"
        };
    }
};
