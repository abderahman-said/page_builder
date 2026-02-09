import React from 'react';
import type { ComponentType } from '../types/store';
import { Hero, Features, Pricing, Testimonials, CTA, Footer, FAQ, Header, Contact } from '../components/library';

export const ComponentRegistry: Record<ComponentType, React.FC<any>> = {
    hero: Hero,
    features: Features,
    pricing: Pricing,
    testimonials: Testimonials,
    cta: CTA,
    footer: Footer,
    faq: FAQ,
    header: Header,
    contact: Contact,
};
