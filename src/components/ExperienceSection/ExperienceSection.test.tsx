import { render, screen } from '@testing-library/react';
import ExperienceSection from './ExperienceSection';
import { describe, it, expect, vi } from 'vitest';

// Mock the child component to isolate the section test
vi.mock('../ExperienceCard', () => ({
    default: ({ position, data }: any) => (
        <div data-testid="experience-card">
            {data.company} - {position}
        </div>
    )
}));

const mockData = [
    {
        position: "Dev 1",
        company: "Comp 1",
        duration: { from: "2020", to: "2021" },
        description: ["Desc 1"]
    },
    {
        position: "Dev 2",
        company: "Comp 2",
        duration: { from: "2021", to: "2022" },
        description: ["Desc 2"]
    }
];

describe('ExperienceSection', () => {
    it('renders the section title', () => {
        render(<ExperienceSection data={mockData} />);
        expect(screen.getByText('<Experience />')).toBeInTheDocument();
    });

    it('renders the correct number of cards', () => {
        render(<ExperienceSection data={mockData} />);
        expect(screen.getAllByTestId('experience-card')).toHaveLength(2);
    });

    it('passes correct props to cards based on index', () => {
        render(<ExperienceSection data={mockData} />);
        expect(screen.getByText('Comp 1 - right')).toBeInTheDocument();
        expect(screen.getByText('Comp 2 - left')).toBeInTheDocument();
    });
});
