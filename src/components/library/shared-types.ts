import type { LucideIcon } from 'lucide-react';

export interface BaseComponentProps {
    id: string;
    variant?: string;
    styles?: any;
    isExport?: boolean;
}

export interface Link {
    label: string;
    href: string;
}

export interface FeatureItem {
    title: string;
    content: string;
    icon?: LucideIcon;
}

export interface PricingItem {
    name: string;
    price: string;
    features: string[];
    buttonText: string;
    popular?: boolean;
}

export interface TestimonialItem {
    quote: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}
