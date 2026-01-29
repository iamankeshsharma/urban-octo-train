import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

// Mock Icon component
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

// Mock data
const mockSocialLinks = [
    {
        name: 'Twitter',
        url: 'https://twitter.com/test',
        icon: MockIcon
    },
    {
        name: 'GitHub',
        url: 'https://github.com/test',
        icon: MockIcon
    }
];

describe('Footer', () => {
    it('renders social links correctly', () => {
        render(<Footer data={mockSocialLinks} />);

        // Should find 2 links
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);

        // Verify first link attributes
        expect(links[0]).toHaveAttribute('href', 'https://twitter.com/test');
        expect(links[0]).toHaveAttribute('target', '_blank');

        // Verify icons are rendered
        const icons = screen.getAllByTestId('mock-icon');
        expect(icons).toHaveLength(2);
    });

    it('applies custom className', () => {
        const customClass = 'bg-black';
        const { container } = render(<Footer data={mockSocialLinks} className={customClass} />);
        expect(container.firstChild).toHaveClass(customClass);
    });

    it('handles empty data', () => {
        render(<Footer data={[]} />);
        const links = screen.queryAllByRole('link');
        expect(links).toHaveLength(0);
    });
});
