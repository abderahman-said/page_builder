import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { LayoutSchema, LayoutComponent, EditorState, ComponentType } from '../types/store';

interface StoreState {
    layout: LayoutSchema;
    editor: EditorState;
    history: LayoutSchema[];
    historyIndex: number;
    isAutoSaving: boolean;
    lastSaveTime: number | null;

    // Actions
    addComponent: (type: ComponentType, index?: number) => void;
    updateComponent: (id: string, updates: Partial<LayoutComponent>) => void;
    removeComponent: (id: string) => void;
    duplicateComponent: (id: string) => void;
    reorderComponents: (startIndex: number, endIndex: number) => void;
    selectComponent: (id: string | null) => void;
    setPreviewMode: (mode: EditorState['previewMode']) => void;
    setThemeMode: (mode: 'light' | 'dark') => void;
    setThemeColor: (color: string) => void;
    setTheme: (updates: Partial<LayoutSchema['theme']>) => void;
    resetComponent: (id: string) => void;
    applyTemplate: (templateName: string) => void;
    importLayout: (json: string) => void;
    saveVersion: (name: string) => void;
    loadVersion: (versionId: string) => void;
    setSEO: (updates: Partial<LayoutSchema['seo']>) => void;
    openAssetsManager: (target: EditorState['assetsManager']['target']) => void;
    closeAssetsManager: () => void;
    selectAsset: (url: string) => void;
    setFocusedProp: (propKey: string | null) => void;

    // History
    undo: () => void;
    redo: () => void;
    saveToHistory: () => void;
    autoSave: () => void;
}

const STORAGE_KEY = 'landing-builder-layout';

export const GOOGLE_FONTS = [
    'Inter',
    'Outfit',
    'Space Grotesk',
    'Plus Jakarta Sans',
    'Bricolage Grotesque',
    'Playfair Display',
    'Montserrat',
    'Poppins',
    'Roboto',
    'Lora',
    'Sora',
];

const DEFAULT_LAYOUT: LayoutSchema = {
    id: uuidv4(),
    name: 'New Page',
    components: [],
    theme: {
        primaryColor: '#3b82f6',
        secondaryColor: '#6366f1',
        fontFamily: 'Inter',
        mode: 'light',
    },
    seo: {
        title: 'My Landing Page',
        description: 'Professional landing page built with Builder.',
    },
    versions: [],
};

const INITIAL_LAYOUT: LayoutSchema = (() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_LAYOUT;

    try {
        const parsed = JSON.parse(saved);
        // Deep merge saved layout with DEFAULT_LAYOUT to catch missing properties in old saves
        return {
            ...DEFAULT_LAYOUT,
            ...parsed,
            theme: { ...DEFAULT_LAYOUT.theme, ...(parsed.theme || {}) },
            seo: { ...DEFAULT_LAYOUT.seo, ...(parsed.seo || {}) },
            components: parsed.components || DEFAULT_LAYOUT.components,
            versions: parsed.versions || DEFAULT_LAYOUT.versions,
        };
    } catch (e) {
        console.error('Failed to parse saved layout', e);
        return DEFAULT_LAYOUT;
    }
})();

// Auto-save functionality
// let autoSaveInterval: number | null = null;

export const useStore = create<StoreState>((set, get) => ({
    isAutoSaving: false,
    lastSaveTime: null,
    layout: INITIAL_LAYOUT,
    editor: {
        selectedComponentId: null,
        previewMode: 'desktop',
        isDragging: false,
        canUndo: false,
        canRedo: false,
        assetsManager: { isOpen: false },
        focusedPropKey: null
    },
    history: [INITIAL_LAYOUT],
    historyIndex: 0,

    autoSave: () => {
        set({ isAutoSaving: true });
        const currentState = get().layout;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
        set({
            isAutoSaving: false,
            lastSaveTime: Date.now()
        });
    },

    addComponent: (type: ComponentType, index?: number) => {
        const variant = 'v1'; // Default to first variant
        const newComponent: LayoutComponent = {
            id: uuidv4(),
            type,
            variant,
            props: getDefaultProps(type, variant),
            styles: {},
        };

        set((state: StoreState) => {
            const newComponents = [...state.layout.components];
            if (typeof index === 'number') {
                newComponents.splice(index, 0, newComponent);
            } else {
                newComponents.push(newComponent);
            }

            const newLayout = { ...state.layout, components: newComponents };
            return {
                layout: newLayout,
                editor: { ...state.editor, selectedComponentId: newComponent.id },
            };
        });
        get().saveToHistory();
    },

    updateComponent: (id: string, updates: Partial<LayoutComponent>) => {
        set((state: StoreState) => {
            const newComponents = state.layout.components.map((comp: LayoutComponent) => {
                if (comp.id === id) {
                    // Deep clone the component to avoid direct mutation
                    const newComp = JSON.parse(JSON.stringify(comp));

                    // Handle props update separately to merge them
                    if (updates.props) {
                        Object.entries(updates.props).forEach(([key, value]) => {
                            // If the key contains a dot, it's a nested path (e.g., 'items.0.name')
                            if (key.includes('.')) {
                                const path = key.split('.');
                                let current = newComp.props;
                                for (let i = 0; i < path.length - 1; i++) {
                                    if (!current[path[i]]) current[path[i]] = {};
                                    current = current[path[i]];
                                }
                                current[path[path.length - 1]] = value;
                            } else {
                                newComp.props[key] = value;
                            }
                        });
                    }

                    // Merge other updates (variant, styles, etc.)
                    const { props: _props, ...otherUpdates } = updates;
                    Object.assign(newComp, otherUpdates);

                    // If variant changed, reset props to default for that variant
                    if (updates.variant && updates.variant !== comp.variant) {
                        newComp.props = getDefaultProps(comp.type, updates.variant);
                    }

                    return newComp;
                }
                return comp;
            });
            return {
                layout: { ...state.layout, components: newComponents },
            };
        });
        get().saveToHistory();
    },

    removeComponent: (id: string) => {
        set((state: StoreState) => {
            const newComponents = state.layout.components.filter((comp: LayoutComponent) => comp.id !== id);
            return {
                layout: { ...state.layout, components: newComponents },
                editor: { ...state.editor, selectedComponentId: null },
            };
        });
        get().saveToHistory();
    },

    duplicateComponent: (id: string) => {
        set((state: StoreState) => {
            const index = state.layout.components.findIndex(c => c.id === id);
            if (index === -1) return state;

            const original = state.layout.components[index];
            const newComponent: LayoutComponent = {
                ...JSON.parse(JSON.stringify(original)),
                id: uuidv4(),
            };

            const newComponents = [...state.layout.components];
            newComponents.splice(index + 1, 0, newComponent);

            return {
                layout: { ...state.layout, components: newComponents },
                editor: { ...state.editor, selectedComponentId: newComponent.id },
            };
        });
        get().saveToHistory();
    },

    reorderComponents: (startIndex, endIndex) => {
        set((state) => {
            const newComponents = Array.from(state.layout.components);
            const [removed] = newComponents.splice(startIndex, 1);
            newComponents.splice(endIndex, 0, removed);
            return {
                layout: { ...state.layout, components: newComponents },
            };
        });
        get().saveToHistory();
    },

    selectComponent: (id) => {
        set((state) => ({
            editor: { ...state.editor, selectedComponentId: id },
        }));
    },

    setPreviewMode: (mode) => {
        set((state) => ({
            editor: { ...state.editor, previewMode: mode },
        }));
    },

    setThemeMode: (mode) => {
        set((state) => ({
            layout: {
                ...state.layout,
                theme: { ...state.layout.theme, mode }
            }
        }));
        get().saveToHistory();
    },

    setSEO: (updates) => {
        set((state) => ({
            layout: {
                ...state.layout,
                seo: { ...state.layout.seo, ...updates }
            }
        }));
        get().saveToHistory();
    },

    importLayout: (json) => {
        try {
            const data = JSON.parse(json);
            // Validate the imported data
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid file format');
            }
            if (!data.components || !Array.isArray(data.components)) {
                throw new Error('Invalid layout: missing components array');
            }
            if (!data.theme || typeof data.theme !== 'object') {
                throw new Error('Invalid layout: missing theme object');
            }

            set({ layout: data, history: [data], historyIndex: 0 });
            localStorage.setItem(STORAGE_KEY, json);
            alert('Layout imported successfully!');
        } catch (e) {
            console.error('Failed to import layout', e);
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
            alert(`Failed to import layout: ${errorMessage}. Please check your file format and try again.`);
        }
    },

    saveVersion: (name) => {
        set((state) => {
            const newVersion = {
                id: uuidv4(),
                name,
                timestamp: Date.now(),
                layout: { ...state.layout }
            };
            const updatedVersions = [...(state.layout.versions || []), newVersion];
            return {
                layout: { ...state.layout, versions: updatedVersions }
            };
        });
        get().saveToHistory();
    },

    loadVersion: (versionId) => {
        const version = get().layout.versions?.find(v => v.id === versionId);
        if (version) {
            const newLayout = { ...version.layout, versions: get().layout.versions };
            set({ layout: newLayout as LayoutSchema });
            get().saveToHistory();
        }
    },

    openAssetsManager: (target) => {
        set((state) => ({
            editor: { ...state.editor, assetsManager: { isOpen: true, target } }
        }));
    },

    closeAssetsManager: () => {
        set((state) => ({
            editor: { ...state.editor, assetsManager: { ...state.editor.assetsManager, isOpen: false } }
        }));
    },

    selectAsset: (url) => {
        const { target } = get().editor.assetsManager;
        if (!target) return;

        if (target.id === 'seo') {
            get().setSEO({ [target.prop]: url });
        } else {
            const component = get().layout.components.find(c => c.id === target.id);
            if (component) {
                get().updateComponent(target.id, {
                    props: { ...component.props, [target.prop]: url }
                });
            }
        }
        get().closeAssetsManager();
    },

    setFocusedProp: (propKey) => {
        set((state) => ({
            editor: { ...state.editor, focusedPropKey: propKey }
        }));
    },

    setThemeColor: (color) => {
        get().setTheme({ primaryColor: color });
    },

    setTheme: (updates) => {
        set((state) => ({
            layout: {
                ...state.layout,
                theme: { ...state.layout.theme, ...updates }
            }
        }));
        get().saveToHistory();
    },

    resetComponent: (id: string) => {
        set((state: StoreState) => {
            const newComponents = state.layout.components.map((comp: LayoutComponent) => {
                if (comp.id === id) {
                    return {
                        ...comp,
                        props: getDefaultProps(comp.type, comp.variant),
                        styles: {},
                    };
                }
                return comp;
            });
            return {
                layout: { ...state.layout, components: newComponents },
            };
        });
        get().saveToHistory();
    },

    applyTemplate: (templateName) => {
        console.log('applyTemplate called with:', templateName); // Debug log

        // Template configurations with component types, variants, and styles
        const templates: Record<string, { components: ComponentType[], variants?: Record<number, string>, glassmorphism?: number[] }> = {
            'SaaS Startup': {
                components: ['header', 'hero', 'features', 'pricing', 'testimonials', 'faq', 'cta', 'footer'],
                variants: { 1: 'v1', 2: 'v1' }, // hero: v1, features: v1
                glassmorphism: [0, 1, 2, 3, 4, 5, 6, 7] // All sections
            },
            'Corporate Professional': {
                components: ['header', 'hero', 'features', 'testimonials', 'cta', 'footer'],
                variants: { 1: 'v2' }, // hero: v2 centered
                glassmorphism: [] // No glassmorphism
            },
            'Creative Agency': {
                components: ['header', 'hero', 'features', 'testimonials', 'faq', 'footer'],
                variants: { 1: 'v1', 2: 'v1' },
                glassmorphism: [1, 2, 3, 4] // Hero, Features, Testimonials, FAQ
            },
            'E-Commerce Store': {
                components: ['header', 'hero', 'features', 'pricing', 'testimonials', 'cta', 'footer'],
                variants: { 1: 'v2', 2: 'v1' }, // hero: v2, features: v1
                glassmorphism: [3] // Only pricing
            },
            'Educational Platform': {
                components: ['header', 'hero', 'features', 'pricing', 'faq', 'testimonials', 'cta', 'footer'],
                variants: { 1: 'v1', 2: 'v1' },
                glassmorphism: [4, 5] // FAQ and Testimonials
            },
            'Landing Page Minimal': {
                components: ['header', 'hero', 'features', 'cta', 'footer'],
                variants: { 1: 'v2', 2: 'v1' }, // hero: v2 centered
                glassmorphism: [] // Ultra-minimal
            },
            'Premium Showcase': {
                components: ['header', 'hero', 'features', 'pricing', 'testimonials', 'faq', 'cta', 'footer'],
                variants: { 1: 'v1', 2: 'v1' },
                glassmorphism: [0, 1, 2, 3, 4, 5, 6, 7] // Full glassmorphism
            },
            'Dark Mode SaaS': {
                components: ['header', 'hero', 'features', 'testimonials', 'pricing', 'contact', 'cta', 'footer'], // Added contact
                variants: { 0: 'pixels', 1: 'pixels', 2: 'pixels', 3: 'pixels', 4: 'pixels', 5: 'pixels', 6: 'pixels', 7: 'pixels' }, // All variants are 'pixels'
                glassmorphism: [] // Handled internal by pixels variant
            }
        };

        const template = templates[templateName] || templates['SaaS Startup'];
        console.log('Selected template:', templateName, 'Template data:', template); // Debug log

        const newComponents: LayoutComponent[] = template.components.map((type, index) => ({
            id: uuidv4(),
            type,
            variant: template.variants?.[index] || 'v1',
            props: getDefaultProps(type, template.variants?.[index] || 'v1'),
            styles: {
                glassmorphism: template.glassmorphism?.includes(index) || false
            },
        }));

        console.log('Created components:', newComponents); // Debug log

        set((state) => {
            // Special handling for Pixels template: Enforce Dark Mode & Pink Primary
            let newTheme = { ...state.layout.theme };
            if (templateName === 'Dark Mode SaaS') {
                newTheme = {
                    ...newTheme,
                    mode: 'dark',
                    primaryColor: '#db2777', // pink-600
                    secondaryColor: '#020617', // slate-950 (background)
                    fontFamily: 'Space Grotesk',
                };
            }

            return {
                layout: {
                    ...state.layout,
                    name: templateName,
                    components: newComponents,
                    theme: newTheme,
                    seo: {
                        ...state.layout.seo,
                        title: state.layout.seo.title === 'My Landing Page' ? templateName : state.layout.seo.title
                    }
                },
                editor: {
                    ...state.editor,
                    canUndo: true,
                    canRedo: false,
                },
            };
        });

        // Save to history after applying template
        get().saveToHistory();
        get().autoSave();
    },

    redo: () => {
        set((state) => {
            if (state.historyIndex < state.history.length - 1) {
                const nextIndex = state.historyIndex + 1;
                return {
                    layout: JSON.parse(JSON.stringify(state.history[nextIndex])),
                    historyIndex: nextIndex,
                    editor: {
                        ...state.editor,
                        canUndo: true,
                        canRedo: nextIndex < state.history.length - 1,
                    },
                };
            }
            return state;
        });
    },

    undo: () => {
        set((state) => {
            if (state.historyIndex > 0) {
                const prevIndex = state.historyIndex - 1;
                return {
                    layout: JSON.parse(JSON.stringify(state.history[prevIndex])),
                    historyIndex: prevIndex,
                    editor: {
                        ...state.editor,
                        canUndo: prevIndex > 0,
                        canRedo: true,
                    },
                };
            }
            return state;
        });
    },

    saveToHistory: () => {
        set((state) => {
            const newHistory = state.history.slice(0, state.historyIndex + 1);
            newHistory.push(JSON.parse(JSON.stringify(state.layout)));
            return {
                history: newHistory,
                historyIndex: newHistory.length - 1,
                editor: {
                    ...state.editor,
                    canUndo: true,
                    canRedo: false,
                },
            };
        });
    },
}));

function getDefaultProps(type: ComponentType, variant: string = 'v1') {
    switch (type) {
        case 'header':
            return {
                logo: 'Builder',
                logoImage: '',
                links: [
                    { label: 'Features', href: '#' },
                    { label: 'Pricing', href: '#' },
                    { label: 'About', href: '#' },
                ],
                cta: 'Sign Up',
                secondaryCta: 'Sign in',
            };
        case 'hero':
            if (variant === 'pixels') {
                return {
                    title: 'Craft Your Perfect Landing Page',
                    subtitle: 'Build high-converting pages in minutes with our intuitive drag-and-drop builder.',
                    buttonText: 'Get Started',
                    secondaryButtonText: 'Watch Demo',
                    badgeText: 'New features available',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                };
            }
            if (variant === 'v2') {
                return {
                    title: 'Centered Growth Strategy',
                    subtitle: 'Focus on what matters most. Our platform scales with your ambition.',
                    buttonText: 'Start Free Trial',
                    secondaryButtonText: 'Watch Demo',
                    badgeText: 'Try 30 days free trial',
                    badgeLabel: 'New',
                    centered: true,
                };
            }
            return {
                title: 'Craft Your Perfect Landing Page',
                subtitle: 'Build high-converting pages in minutes with our intuitive drag-and-drop builder.',
                buttonText: 'Get Started',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            };
        case 'features':
            if (variant === 'pixels') {
                return {
                    title: 'Everything you need to scale',
                    badgeText: 'Features',
                    subtitle: 'Components, patterns and pages — everything you need to ship.',
                    description: 'PrebuiltUI helps you build faster by transforming your design vision into fully functional, production-ready UI components.',
                    showcaseTitle: 'Better design with highest revenue and profits',
                    showcaseDescription: 'PrebuiltUI empowers you to build beautifully and scale effortlessly.',
                    linkText: 'Learn more about the product',
                    items: [
                        { title: 'Lightning-fast setup', content: 'Launch production-ready pages in minutes with prebuilt components.', icon: 'pixels/zap-icon.svg' },
                        { title: 'Pixel perfect', content: 'Modern Figma-driven UI that translates to exact code.', icon: 'pixels/thumb-icon.svg', highlight: true },
                        { title: 'Highly customizable', content: 'Tailwind utility-first classes make customization trivial.', icon: 'pixels/shape-icon.svg' },
                    ],
                };
            }
            return {
                title: 'Everything you need to scale',
                badgeText: 'Features',
                items: [
                    { title: 'Lightning Fast', content: 'Optimized performance for maximum conversion rates.', icon: 'Zap' },
                    { title: 'Secure by Design', content: 'Enterprise-grade security built into every block.', icon: 'Shield' },
                    { title: 'Always Syncing', content: 'Your data is always up to date across all devices.', icon: 'RefreshCw' },
                ],
            };
        case 'pricing':
            if (variant === 'pixels') {
                return {
                    title: 'Flexible plans for teams of all sizes',
                    badgeText: 'Pricing',
                    subtitle: 'Flexible pricing options designed to meet your needs — whether you\'re just getting started or scaling up.',
                    items: [
                        { name: 'Basic', price: '$29', features: ['Access to all basic courses', 'Community support', '10 practice projects'], buttonText: 'Get Started' },
                        { name: 'Pro', price: '$79', features: ['Access to all Pro courses', 'Priority community support', '30 practice projects'], buttonText: 'Get Started', popular: true, popularLabel: 'Most Popular' },
                        { name: 'Enterprise', price: '$199', features: ['Access to all courses', 'Dedicated support', 'Unlimited projects'], buttonText: 'Get Started' },
                    ],
                };
            }
            return {
                title: 'Flexible plans for teams of all sizes',
                badgeText: 'Pricing',
                items: [
                    { name: 'Starter', price: '$0', features: ['3 Projects', 'Basic Analytics', 'Community Support'], buttonText: 'Get Started' },
                    { name: 'Professional', price: '$49', features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domains'], buttonText: 'Upgrade Now', popular: true },
                ],
            };
        case 'testimonials':
            return {
                title: 'Trusted by world-class teams',
                badgeText: 'Testimonials',
                items: [
                    { name: 'Alex Johnson', role: 'CEO at Techflow', quote: 'PrebuiltUI has completely transformed our workflow.', avatar: '' },
                    { name: 'Sarah Chen', role: 'Product Designer', quote: 'The best UI library I\'ve ever used.', avatar: '' },
                ],
            };
        case 'faq':
            if (variant === 'pixels') {
                return {
                    title: 'Frequently Asked Questions',
                    badgeText: 'Help Center',
                    items: [
                        { question: 'What is PrebuiltUI?', answer: 'PrebuiltUI is a collection of high-quality, pre-designed components and templates that help you build stunning websites faster. Our components are built with React and Tailwind CSS, ensuring they are easy to use and highly customizable.' },
                        { question: 'How do I get started?', answer: 'Getting started is easy! Simply choose a template or browse our component library, copy the code, and paste it into your project. You can also use our page builder to visually design your site.' },
                        { question: 'Is it free to use?', answer: 'We offer both free and premium components. You can use our free components in any project, while our premium components require a subscription or a one-time purchase.' },
                        { question: 'Do you offer support?', answer: 'Absolutely! Our team is dedicated to helping you succeed. If you have any questions or run into any issues, you can reach out to us through our support center or community forum.' },
                    ],
                };
            }
            return {
                title: 'Frequently Asked Questions',
                badgeText: 'FAQ',
                items: [
                    { question: 'What is PrebuiltUI?', answer: 'PrebuiltUI is a library of premium components.' },
                    { question: 'How do I get started?', answer: 'Simply copy and paste our components.' },
                ],
            };
        case 'cta':
            return {
                title: 'Ready to transform your workflow?',
                subtitle: 'Join over 10,000 creators and start building today.',
                buttonText: 'Get Started for Free',
            };
        case 'contact':
            return {
                title: 'Reach out to us',
                subtitle: 'Ready to grow your brand? Let’s connect and build something exceptional together.',
                badgeText: 'Contact',
                buttonText: 'Submit',
                nameLabel: 'Your name',
                emailLabel: 'Email id',
                messageLabel: 'Message',
                namePlaceholder: 'Enter your name',
                emailPlaceholder: 'Enter your email',
                messagePlaceholder: 'Enter your message',
            };
        case 'footer':
            return {
                content: '© 2024 Builder Inc. Built with love for creators.',
                footerLogoImage: '',
                badgeText: 'Pixels.',
                credits: '© 2025 PrebuiltUI.',
                description: 'Making every customer feel valued—no matter the size of your audience.',
                columns: [
                    { title: 'Product', links: ['Home', 'Support', 'Pricing', 'Affiliate'] },
                    { title: 'Resources', links: ['Company', 'Blogs', 'Community', 'Careers', 'About'] },
                    { title: 'Legal', links: ['Privacy', 'Terms'] },
                ],
                socials: [
                    { platform: 'twitter', url: 'https://twitter.com' },
                    { platform: 'github', url: 'https://github.com' },
                    { platform: 'linkedin', url: 'https://linkedin.com' },
                    { platform: 'instagram', url: 'https://instagram.com' },
                ],
            };
        default:
            return {};
    }
}
