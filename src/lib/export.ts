
import type { LayoutSchema } from '../types/store';
import { ComponentRegistry } from './registry';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Helper to convert hex to RGB for Tailwind opacity support
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
};

// Vanilla JavaScript for interactive components
const interactiveScript = `
    document.addEventListener('DOMContentLoaded', () => {
        // Remove contentEditable
        const editableElements = document.querySelectorAll('[contenteditable]');
        editableElements.forEach(el => el.removeAttribute('contenteditable'));

        // FAQ Accordion Logic - Improved selectors
        const faqItems = document.querySelectorAll('[data-faq-item]');
        faqItems.forEach((item, index) => {
            const button = item.querySelector('[data-faq-button]');
            const content = item.querySelector('[data-faq-content]');
            const icon = item.querySelector('[data-faq-icon]');
            
            if (button && content) {
                button.addEventListener('click', () => {
                    const isOpen = content.classList.contains('max-h-0');
                    
                    // Close all others
                    faqItems.forEach((otherItem, otherIndex) => {
                        if (otherIndex !== index) {
                            const otherContent = otherItem.querySelector('[data-faq-content]');
                            const otherIcon = otherItem.querySelector('[data-faq-icon]');
                            if (otherContent) {
                                otherContent.classList.add('max-h-0', 'opacity-0');
                                otherContent.classList.remove('max-h-[500px]', 'opacity-100', 'pb-8', 'px-8');
                            }
                            if (otherIcon) {
                                otherIcon.classList.remove('bg-primary', 'text-primary-foreground', 'rotate-180');
                                otherIcon.classList.add('bg-background'); 
                            }
                            otherItem.classList.remove('border-primary/50', 'bg-primary/[0.03]', 'shadow-2xl', 'shadow-primary/5');
                        }
                    });

                    // Toggle current
                    if (isOpen) {
                        content.classList.add('max-h-0', 'opacity-0');
                        content.classList.remove('max-h-[500px]', 'opacity-100', 'pb-8', 'px-8');
                        
                        // Icon styles
                        if(icon) {
                            icon.classList.remove('bg-primary', 'text-primary-foreground', 'rotate-180');
                            icon.classList.add('bg-background');
                        }
                        // Border/Shadow styles
                        item.classList.remove('border-primary/50', 'bg-primary/[0.03]', 'shadow-2xl', 'shadow-primary/5');
                        // Add default glass styles back if needed
                    } else {
                        content.classList.remove('max-h-0', 'opacity-0');
                        content.classList.add('max-h-[500px]', 'opacity-100', 'pb-8', 'px-8');

                        // Icon styles
                        if(icon) {
                            icon.classList.add('bg-primary', 'text-primary-foreground', 'rotate-180');
                            icon.classList.remove('bg-background');
                        }
                         // Border/Shadow styles
                        item.classList.add('border-primary/50', 'bg-primary/[0.03]', 'shadow-2xl', 'shadow-primary/5');
                    }
                });
            }
        });

        // Mobile Menu Logic (Future-proofing)
        const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                } else {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    });
`;

export const generateStandaloneHTML = (layout: LayoutSchema): string => {
    const componentsHTML = layout.components.map((component) => {
        const Component = ComponentRegistry[component.type];
        if (!Component) return '';

        // We need to wrap it in a container that matches our styling
        return renderToStaticMarkup(React.createElement(Component, { ...component.props, styles: component.styles }));
    }).join('\n');

    const primaryRgb = hexToRgb(layout.theme.primaryColor) || '59 130 246'; // Default blue-500
    const secondaryRgb = hexToRgb(layout.theme.secondaryColor) || '99 102 241'; // Default indigo-500

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${layout.seo.title || layout.name}</title>
    <meta name="description" content="${layout.seo.description || ''}">
    ${layout.seo.ogImage ? `<meta property="og:image" content="${layout.seo.ogImage}">` : ''}
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: 'rgb(var(--primary) / <alpha-value>)',
                        secondary: 'rgb(var(--secondary) / <alpha-value>)',
                    },
                    fontFamily: {
                        sans: ['${layout.theme.fontFamily}', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=${layout.theme.fontFamily.replace(' ', '+')}:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${primaryRgb};
            --secondary: ${secondaryRgb};
        }
        body {
            font-family: '${layout.theme.fontFamily}', sans-serif;
            background-color: ${layout.theme.mode === 'dark' ? '#0f172a' : '#ffffff'};
            color: ${layout.theme.mode === 'dark' ? '#f8fafc' : '#0f172a'};
        }
    </style>
</head>
<body>
    <div id="root">
        ${componentsHTML}
    </div>
    <script>
        ${interactiveScript}
    </script>
</body>
</html>
  `;
};
