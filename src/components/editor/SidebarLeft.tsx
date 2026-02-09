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
    PanelBottom
} from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useStore } from '../../store/useStore';
import type { ComponentType } from '../../types/store';
import { cn } from '../../lib/utils';

const CATEGORIES = [
    { id: 'basics', label: 'Basics', icon: Grid },
    { id: 'marketing', label: 'Marketing', icon: MousePointer2 },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'templates', label: 'Templates', icon: Layers },
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
    const [activeCategory, setActiveCategory] = useState('basics');

    const filteredComponents = COMPONENT_PALETTE.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()) &&
        (activeCategory === 'all' || item.category === activeCategory)
    );

    return (
        <aside className="w-[280px] border-r bg-background flex flex-col z-20 shadow-sm relative overflow-hidden">
            {/* Search Header */}
            <div className="p-5 border-b space-y-4">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                        Components
                    </h2>
                    <button className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors">
                        <Plus size={14} />
                    </button>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={14} />
                    <input
                        type="text"
                        placeholder="Search blocks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-muted/40 border-transparent border focus:border-border hover:bg-muted/60 focus:bg-background rounded-lg text-xs font-medium transition-all outline-none"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex px-5 py-2 border-b bg-muted/5 gap-4 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "flex flex-col items-center gap-1.5 py-1 min-w-[50px] transition-all relative group",
                                activeCategory === cat.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg transition-all",
                                activeCategory === cat.id ? "bg-foreground text-background shadow-md shadow-black/10" : "bg-muted/40 group-hover:bg-muted"
                            )}>
                                <Icon size={14} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider scale-95">{cat.label}</span>
                            {activeCategory === cat.id && (
                                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-foreground rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Component List */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-muted/5">
                <div className="grid gap-3">
                    {activeCategory === 'templates' ? (
                        [
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
                        ))
                    ) : filteredComponents.length > 0 ? (
                        filteredComponents.map((item) => (
                            <PaletteItem key={item.type} {...item} />
                        ))
                    ) : (
                        <div className="py-12 text-center space-y-2">
                            <Layers className="mx-auto text-muted-foreground/30" size={32} />
                            <p className="text-xs text-muted-foreground font-medium">No components found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="p-4 border-t bg-muted/10">
                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                    <span>Help & Resources</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                    <button className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border shadow-sm hover:border-foreground/20 transition-all text-[10px] font-bold text-foreground/80">
                        <Settings size={12} />
                        Settings
                    </button>
                    <button className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border shadow-sm hover:border-foreground/20 transition-all text-[10px] font-bold text-foreground/80">
                        <HelpCircle size={12} />
                        Support
                    </button>
                </div>
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
                "group relative flex items-center gap-3 p-3 bg-background border border-border/60 rounded-xl hover:border-foreground/20 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-grab active:cursor-grabbing",
                isDragging ? "opacity-30 border-dashed ring-1 ring-border" : "opacity-100"
            )}
        >
            <div className="flex items-center justify-center p-2.5 rounded-lg bg-muted group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-sm border border-transparent group-hover:shadow-lg group-hover:shadow-black/10">
                <Icon size={16} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
                <span className="text-[11px] font-bold text-foreground/80 group-hover:text-foreground transition-colors tracking-tight leading-none mb-0.5">
                    {label}
                </span>
                <span className="text-[9px] text-muted-foreground group-hover:text-muted-foreground/80 transition-colors uppercase tracking-widest font-bold">
                    Interactive
                </span>
            </div>
            <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus size={12} className="text-muted-foreground" />
            </div>
        </div>
    );
};

const TemplateItem = ({ name, description }: { name: string; description: string }) => {
    const { applyTemplate } = useStore();
    
    const handleTemplateClick = () => {
        console.log('=== TEMPLATE CLICK DEBUG ===');
        console.log('Template name clicked:', name);
        console.log('Available templates:', ['SaaS Startup', 'Corporate Professional', 'Creative Agency', 'E-Commerce Store', 'Educational Platform', 'Landing Page Minimal', 'Premium Showcase', 'Dark Mode SaaS']);
        
        if (confirm(`Applying "${name}" will replace your current layout. Continue?`)) {
            console.log('User confirmed - applying template:', name);
            try {
                applyTemplate(name);
                console.log('Template applied successfully');
            } catch (error) {
                console.error('Error applying template:', error);
                alert(`Failed to apply template "${name}". Please try again.`);
            }
        } else {
            console.log('User cancelled template application');
        }
    };

    return (
        <button
            onClick={handleTemplateClick}
            className="group relative flex flex-col gap-3 p-4 bg-background border border-border/60 rounded-xl hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left"
        >
            <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border/40 flex items-center justify-center group-hover:from-primary/20 group-hover:via-primary/10 transition-all">
                <div className="text-4xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    {name.split(' ')[0]}
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-[11px] font-bold text-foreground transition-colors line-clamp-1">
                    {name}
                </div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                    {description}
                </div>
            </div>
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <Plus size={12} strokeWidth={3} />
            </div>
        </button>
    );
};
