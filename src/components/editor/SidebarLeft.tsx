import React, { useState } from 'react';
import {
    Search,
    Plus,
    Grid,
    MousePointer2,
    Layers,
    Settings,
    HelpCircle,
    Layout,
    CreditCard,
    MessageSquare,
    Navigation,
    PanelBottom,
    Box,
    Sparkles
} from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useStore } from '../../store/useStore';
import type { ComponentType } from '../../types/store';
import { cn } from '../../lib/utils';

const MAIN_NAV = [
    { id: 'blocks', label: 'Blocks', icon: Box },
    { id: 'templates', label: 'Templates', icon: Sparkles },
    { id: 'layers', label: 'Layers', icon: Layers },
    // { id: 'media', label: 'Media', icon: ImageIcon },
];

const CATEGORIES = [
    { id: 'basics', label: 'Basics', icon: Grid },
    { id: 'marketing', label: 'Marketing', icon: MousePointer2 },
    { id: 'layout', label: 'Layout', icon: Layout },
];

const COMPONENT_PALETTE: { type: ComponentType; label: string; icon: any; category: string }[] = [
    { type: 'hero', label: 'Hero Section', icon: Layout, category: 'marketing' },
    { type: 'features', label: 'Features Grid', icon: Grid, category: 'basics' },
    { type: 'pricing', label: 'Pricing Table', icon: CreditCard, category: 'marketing' },
    { type: 'testimonials', label: 'Testimonials', icon: MessageSquare, category: 'marketing' },
    { type: 'faq', label: 'FAQ Section', icon: HelpCircle, category: 'basics' },
    { type: 'cta', label: 'Call to Action', icon: MousePointer2, category: 'marketing' },
    { type: 'footer', label: 'Footer Section', icon: PanelBottom, category: 'layout' },
    { type: 'header', label: 'Navbar / Header', icon: Navigation, category: 'layout' },
];

export const SidebarLeft: React.FC = () => {
    const [search, setSearch] = useState('');
    const [activeNav, setActiveNav] = useState('blocks');
    const [activeCategory, setActiveCategory] = useState('basics');

    const filteredComponents = COMPONENT_PALETTE.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()) &&
        (activeCategory === 'all' || item.category === activeCategory)
    );

    return (
        <aside className="w-[340px] border-r bg-background flex z-20 shadow-sm relative overflow-hidden h-full">
            {/* Main Navigation Rail */}
            <div className="w-[70px] border-r bg-muted/20 flex flex-col items-center py-6 gap-6">
                <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center text-background mb-4 shadow-lg shadow-black/10">
                    <Sparkles size={20} />
                </div>

                <div className="flex flex-col gap-4">
                    {MAIN_NAV.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={cn(
                                    "p-3 rounded-2xl transition-all relative group",
                                    isActive
                                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                                title={item.label}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-foreground rounded-r-full" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto flex flex-col gap-4 pb-4">
                    <button className="p-3 rounded-2xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* Sub-Panel */}
            <div className="flex-1 flex flex-col min-w-0 bg-background/50 backdrop-blur-sm">
                {activeNav === 'blocks' && (
                    <>
                        {/* Search Header */}
                        <div className="p-6 space-y-5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-sm font-black tracking-tight text-foreground uppercase">
                                    Blocks
                                </h2>
                                <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                                    Drag & Drop to build
                                </p>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search blocks..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 bg-muted/40 border-border/40 border focus:border-foreground/20 hover:bg-muted/60 focus:bg-background rounded-xl text-xs font-semibold transition-all outline-none"
                                />
                            </div>

                            {/* Category Pills */}
                            <div className="flex gap-2 p-1 bg-muted/30 rounded-xl overflow-hidden border border-border/40">
                                {CATEGORIES.map(cat => {
                                    const isActive = activeCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={cn(
                                                "flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                                                isActive
                                                    ? "bg-background text-foreground shadow-sm ring-1 ring-border/20"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Component List */}
                        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                            <div className="grid gap-4">
                                {filteredComponents.length > 0 ? (
                                    filteredComponents.map((item) => (
                                        <PaletteItem key={item.type} {...item} />
                                    ))
                                ) : (
                                    <div className="py-12 text-center space-y-2 opacity-40">
                                        <Box className="mx-auto" size={32} />
                                        <p className="text-xs font-bold uppercase tracking-widest">No components found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {activeNav === 'templates' && (
                    <div className="flex-1 flex flex-col">
                        <div className="p-6 border-b">
                            <h2 className="text-sm font-black tracking-tight text-foreground uppercase mb-1">
                                Templates
                            </h2>
                            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                                Pre-built full layouts
                            </p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
                            {[
                                { name: 'SaaS Startup', desc: 'Modern tech product' },
                                { name: 'Corporate Professional', desc: 'Business services' },
                                { name: 'Creative Agency', desc: 'Design portfolio' },
                                { name: 'E-Commerce Store', desc: 'Product sales' },
                                { name: 'Educational Platform', desc: 'Online courses' },
                                { name: 'Landing Page Minimal', desc: 'Lead generation' },
                                { name: 'Premium Showcase', desc: 'Luxury brand' },
                                { name: 'Dark Mode SaaS', desc: 'Modern dark theme' }
                            ].map(template => (
                                <TemplateItem key={template.name} name={template.name} description={template.desc} />
                            ))}
                        </div>
                    </div>
                )}

                {activeNav === 'layers' && (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-40">
                        <Layers size={40} className="mb-4" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Layers Panel</h3>
                        <p className="text-xs mt-2">Manage your page structure here.</p>
                    </div>
                )}
            </div>
        </aside>
    );
};

const PaletteItem = ({ type, label, icon: Icon }: any) => {
    const { addComponent } = useStore();
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `palette-${type}`,
        data: { type, isPaletteItem: true },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onClick={() => addComponent(type)}
            className={cn(
                "group relative flex items-center gap-4 p-4 bg-background border border-border/40 rounded-2xl hover:border-foreground/40 hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all cursor-grab active:cursor-grabbing",
                isDragging ? "opacity-30 border-dashed ring-1 ring-border shadow-none" : "opacity-100"
            )}
        >
            <div className="flex items-center justify-center p-3 rounded-xl bg-muted/50 group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-sm border border-transparent group-hover:shadow-lg group-hover:shadow-black/5 shrink-0">
                <Icon size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-foreground transition-colors tracking-tight leading-none mb-1">
                    {label}
                </span>
                <span className="text-[9px] text-muted-foreground/60 uppercase tracking-widest font-black overflow-hidden text-ellipsis whitespace-nowrap">
                    Drag to add
                </span>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity bg-muted p-1.5 rounded-full">
                <Plus size={12} className="text-foreground" />
            </div>
        </div>
    );
};

const TemplateItem = ({ name, description }: { name: string; description: string }) => {
    const { applyTemplate } = useStore();

    const handleTemplateClick = () => {
        if (confirm(`Applying "${name}" will replace your current layout. Continue?`)) {
            try {
                applyTemplate(name);
            } catch (error) {
                console.error('Error applying template:', error);
                alert(`Failed to apply template "${name}". Please try again.`);
            }
        }
    };

    return (
        <button
            onClick={handleTemplateClick}
            className="group relative w-full flex flex-col gap-3 p-3 bg-background border border-border/40 rounded-2xl hover:border-foreground/30 hover:shadow-xl hover:-translate-y-1 transition-all text-left overflow-hidden shadow-sm"
        >
            <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-primary/10 via-background to-muted/20 border border-border/20 flex flex-col items-center justify-center group-hover:from-primary/20 group-hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.05),transparent)] pointer-events-none" />
                <div className="text-3xl font-black opacity-10 group-hover:opacity-20 transition-opacity scale-90 group-hover:scale-100 duration-500 tracking-tighter uppercase italic">
                    {name.split(' ')[0]}
                </div>
                <div className="absolute bottom-4 flex gap-1 items-center px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/40 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                    <Sparkles size={12} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Apply Layout</span>
                </div>
            </div>
            <div className="px-1 py-1">
                <div className="text-[12px] font-black text-foreground transition-colors mb-0.5 tracking-tight uppercase italic underline decoration-primary/20 underline-offset-4">
                    {name}
                </div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-black opacity-60">
                    {description}
                </div>
            </div>
        </button>
    );
};
