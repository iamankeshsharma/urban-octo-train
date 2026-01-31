import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectSection from './ProjectSection';

// Mock the ProjectCard component to simplify ProjectSection tests
// We only need to verify it receives the correct props and is rendered

// Mock data
const mockProjects = [
    {
        name: 'Project 1',
        description: 'Description 1',
        tags: ['Tag1'],
        link: 'http://link1.com',
        image: 'img1.jpg'
    },
    {
        name: 'Project 2',
        description: 'Description 2',
        tags: ['Tag2'],
        link: 'http://link2.com',
        image: 'img2.jpg'
    }
];

describe('ProjectSection', () => {
    it('renders section title', () => {
        render(<ProjectSection data={mockProjects} />);
        expect(screen.getByText('<Projects />')).toBeInTheDocument();
    });

    it('renders list of projects', () => {
        render(<ProjectSection data={mockProjects} />);
        
        // Check if project names are rendered (ProjectCard implementation renders names)
        expect(screen.getByText('Project 1')).toBeInTheDocument();
        expect(screen.getByText('Project 2')).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <ProjectSection data={mockProjects}>
                <div data-testid="section-child">Section Child</div>
            </ProjectSection>
        );
        expect(screen.getByTestId('section-child')).toBeInTheDocument();
        expect(screen.getByText('Section Child')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const customClass = 'test-section-class';
        const { container } = render(<ProjectSection data={mockProjects} className={customClass} />);
        expect(container.firstChild).toHaveClass(customClass);
    });

    it('handles empty data gracefully', () => {
        render(<ProjectSection data={[]} />);
        expect(screen.getByText('<Projects />')).toBeInTheDocument();
        // Should rely on "Children passed to ProjectCard" logic or just not render cards? 
        // Based on code: data?.map(...) -> if empty array, renders nothing.
        // So we just check that no project cards are rendered. 
        // We can check for texts that would be in cards.
        expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    });

    it('handles undefined data gracefully', () => {
        render(<ProjectSection data={undefined} />);
        expect(screen.getByText('<Projects />')).toBeInTheDocument();
    });
});
