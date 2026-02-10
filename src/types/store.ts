export type ComponentType =
    | 'hero'
    | 'features'
    | 'pricing'
    | 'testimonials'
    | 'cta'
    | 'faq'
    | 'header'
    | 'footer'
    | 'contact';

export interface ComponentStyles {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    textAlign?: 'left' | 'center' | 'right';
    borderRadius?: string;
    glassmorphism?: boolean;
    [key: string]: string | boolean | undefined;
}

export interface ComponentProps {
    title?: string;
    subtitle?: string;
    content?: string;
    buttonText?: string;
    image?: string;
    items?: any[];
    [key: string]: any;
}

export interface LayoutComponent {
    id: string;
    type: ComponentType;
    variant: string;
    props: ComponentProps;
    styles: ComponentStyles;
}

export interface LayoutSchema {
    id: string;
    name: string;
    components: LayoutComponent[];
    theme: {
        primaryColor: string;
        secondaryColor: string;
        fontFamily: string;
        mode: 'light' | 'dark';
    };
    seo: {
        title: string;
        description: string;
        ogImage?: string;
    };
    versions?: Array<{
        id: string;
        name: string;
        timestamp: number;
        layout: Omit<LayoutSchema, 'versions'>;
    }>;
}

export interface EditorState {
    selectedComponentId: string | null;
    previewMode: 'desktop' | 'tablet' | 'mobile';
    isDragging: boolean;
    canUndo: boolean;
    canRedo: boolean;
    assetsManager: {
        isOpen: boolean;
        target?: {
            id: string; // component id or 'seo'
            prop: string;
            type: 'image' | 'icon';
        };
    };
    focusedPropKey: string | null;
}

// Helper to check if layout is valid
export const isValidLayout = (layout: any): layout is LayoutSchema => {
    return layout && typeof layout === 'object' && 'id' in layout && Array.isArray(layout.components);
};
