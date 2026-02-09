import type { LayoutSchema } from '../types/store';
import { ComponentRegistry } from './registry';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getHTMLTemplate } from './export/templates';

// Helper to convert hex to RGB for Tailwind opacity support
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
};

export const generateStandaloneHTML = (layout: LayoutSchema): string => {
    const componentsHTML = layout.components.map((component) => {
        const Component = ComponentRegistry[component.type];
        if (!Component) return '';

        return renderToStaticMarkup(React.createElement(Component, {
            ...component.props,
            id: component.id,
            variant: component.variant,
            styles: component.styles,
            isExport: true
        }));
    }).join('\n');

    const primaryRgb = hexToRgb(layout.theme.primaryColor) || '59 130 246';
    const secondaryRgb = hexToRgb(layout.theme.secondaryColor) || '99 102 241';

    return getHTMLTemplate(layout, componentsHTML, primaryRgb, secondaryRgb);
};
