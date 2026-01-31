import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import { describe, it, expect } from 'vitest';

describe('HeroSection', () => {
    it('renders the main heading', () => {
        render(<HeroSection />);
        expect(screen.getByText('ANKESH SHARMA')).toBeInTheDocument();
    });

    it('renders the profile image', () => {
        render(<HeroSection />);
        const image = screen.getByAltText('profile photo of ankesh');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', './assets/user.jpeg');
    });

    it('renders skill icons', () => {
        render(<HeroSection />);
        const svgs = document.querySelectorAll('svg');
        expect(svgs).toHaveLength(14);
        svgs?.forEach(svg => {
            expect(svg).toHaveAttribute('aria-label');
        });
    });
});