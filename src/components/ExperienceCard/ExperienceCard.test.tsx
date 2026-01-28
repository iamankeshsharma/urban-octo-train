import { render, screen } from '@testing-library/react';
import ExperienceCard from './ExperienceCard';
import { describe, it, expect } from 'vitest';

const mockData = {
    position: "Software Engineer",
    company: "Tech Corp",
    duration: {
        from: "Jan 2023",
        to: "Present"
    },
    description: [
        "Built amazing things",
        "Improved performance"
    ]
};

describe('ExperienceCard', () => {
    it('renders without crashing', () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
        expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
    });

    it('displays the correct duration', () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText(/Jan 2023/i)).toBeInTheDocument();
        expect(screen.getByText(/Present/i)).toBeInTheDocument();
    });

    it('renders the description list correctly', () => {
        render(<ExperienceCard data={mockData} />);
        expect(screen.getByText('Built amazing things')).toBeInTheDocument();
        expect(screen.getByText('Improved performance')).toBeInTheDocument();
    });
});
