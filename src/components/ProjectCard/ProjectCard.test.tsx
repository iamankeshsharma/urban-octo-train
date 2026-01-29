import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from './ProjectCard';

const mockProject = {
  name: 'Test Project',
  description: 'This is a test project description.',
  tags: ['React', 'TypeScript', 'Tailwind'],
  link: 'https://github.com/test/project',
  image: 'test-image.jpg', // Assuming image is part of the project type, though not explicitly used in the component snippet provided, checking generic usage.
  // Add other properties if required by the type definition in real usage, based on the component code it seems these are the main ones used.
};

describe('ProjectCard', () => {
  it('renders project name description and tags', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
  });

  it('renders codebase link with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByRole('link', { name: /codebase/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/test/project');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders children correctly', () => {
    render(
      <ProjectCard project={mockProject}>
        <div data-testid="child-element">Child Content</div>
      </ProjectCard>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<ProjectCard project={mockProject} className={customClass} />);
    
    // The component uses twMerge, so the class should be present in the first div
    expect(container.firstChild).toHaveClass(customClass);
  });
});
