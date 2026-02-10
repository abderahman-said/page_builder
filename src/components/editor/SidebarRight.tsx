import React, { useState } from 'react';
import { useStore, GOOGLE_FONTS } from '../../store/useStore';
import {
    Trash2,
    Sliders,
    Type,
    Palette,
    Layout,
    Check,
    Globe,
    Search,
    ImageIcon,
    ChevronDown,
    RotateCcw,
    ExternalLink,
    Settings2,
    Monitor,
    Activity,
    PanelBottom
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Helper for mapping prop keys to human readable labels
const PROP_LABELS: Record<string, string> = {
    badgeText: 'Badge Label',
    title: 'Main Heading',
    subtitle: 'Description',
    cta: 'Primary Action',
    secondaryCta: 'Secondary Action',
    showcaseTitle: 'Portfolio Title',
    showcaseDescription: 'Portfolio Text',
    linkText: 'Link Label',
    items: 'Collection Items',
    links: 'Navigation Links',
    columns: 'Footer Columns',
    credits: 'Copyright Text',
    footerLogoImage: 'Brand Logo',
    logoImage: 'Brand Logo',
    logo: 'Brand Name',
    quote: 'Testimonial',
    name: 'Full Name',
    role: 'Job Title / Role',
    avatar: 'User Avatar',
    icon: 'Visual Icon',
    price: 'Price Amount',
    popularLabel: 'Feature Tag',
    popular: 'Featured Item',
    active: 'Is Visible',
    content: 'Body Content',
    question: 'FAQ Question',
    answer: 'FAQ Answer',
    emailLabel: 'Email Field Label',
    nameLabel: 'Name Field Label',
    messageLabel: 'Message Field Label',
    buttonText: 'Submit Button'
};

const getLabel = (key: string) => PROP_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

// Custom Accordion Component
const Accordion: React.FC<{
    title: string;
    icon: any;
    children: React.ReactNode;
    defaultOpen?: boolean;
    badge?: string;
}> = ({ title, icon: Icon, children, defaultOpen = true, badge }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-border/40">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-14 flex items-center justify-between px-6 hover:bg-muted/30 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2 rounded-lg transition-all",
                        isOpen ? "bg-foreground text-background" : "bg-muted text-muted-foreground group-hover:text-foreground"
                    )}>
                        <Icon size={14} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-foreground/80 group-hover:text-foreground">
                        {title}
                    </span>
                    {badge && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-tighter">
                            {badge}
                        </span>
                    )}
                </div>
                <ChevronDown size={14} className={cn("text-muted-foreground transition-transform duration-300", isOpen ? "rotate-0" : "-rotate-90")} />
            </button>
            <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[5000px] opacity-100 mb-6" : "max-h-0 opacity-0"
            )}>
                <div className="px-6 pt-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Custom Switch Component
const Switch: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
    <div
        onClick={() => onChange(!checked)}
        className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/40 cursor-pointer hover:border-foreground/20 transition-all group"
    >
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
        <div className={cn(
            "w-10 h-5 rounded-full relative transition-all duration-300 shadow-inner",
            checked ? "bg-primary shadow-primary/20" : "bg-muted-foreground/20"
        )}>
            <div className={cn(
                "absolute top-1 bottom-1 w-3 rounded-full bg-background shadow-md transition-all duration-300",
                checked ? "left-6" : "left-1"
            )} />
        </div>
    </div>
);

export const SidebarRight: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'design' | 'page'>('design');
    const [expandedItem, setExpandedItem] = React.useState<string | null>(null);
    const {
        editor,
        layout,
        updateComponent,
        removeComponent,
        resetComponent,
        selectComponent,
        setThemeColor,
        setTheme,
        setSEO,
        openAssetsManager
    } = useStore();

    const selectedComponent = layout.components.find(
        (c) => c.id === editor.selectedComponentId
    );

    // Auto-switch back to designer if component selected
    React.useEffect(() => {
        if (selectedComponent) setActiveTab('design');
        else setActiveTab('page');
    }, [selectedComponent?.id]);

    const VARIANTS = ['v1', 'v2', 'v3'];

    return (
        <aside className="w-[340px] border-l bg-background flex flex-col z-20 shadow-sm relative h-full">
            {/* Context Header */}
            <div className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-foreground text-background shadow-lg shadow-black/10">
                        {activeTab === 'design' ? <Activity size={16} /> : <Globe size={16} />}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-[11px] font-black uppercase tracking-tighter leading-none text-foreground">
                            {activeTab === 'design' ? 'Interaction' : 'Workspace'}
                        </h2>
                        <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-60 italic">
                            {activeTab === 'design' && selectedComponent ? `${selectedComponent.type} block` : 'Global Workspace'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                        <Monitor size={14} />
                    </button>
                    {selectedComponent && (
                        <button
                            onClick={() => confirm('Delete this block?') && removeComponent(selectedComponent.id)}
                            className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Mode Switcher */}
            <div className="px-6 py-4 flex gap-2">
                <button
                    onClick={() => setActiveTab('design')}
                    disabled={!selectedComponent}
                    className={cn(
                        "flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all border",
                        activeTab === 'design'
                            ? "bg-foreground text-background border-foreground shadow-lg shadow-black/10"
                            : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50 disabled:opacity-20 translate-y-0"
                    )}
                >
                    <Sliders size={16} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">Editor</span>
                </button>
                <button
                    onClick={() => setActiveTab('page')}
                    className={cn(
                        "flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all border",
                        activeTab === 'page'
                            ? "bg-foreground text-background border-foreground shadow-lg shadow-black/10"
                            : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                    )}
                >
                    <Settings2 size={16} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">Global</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'design' && selectedComponent ? (
                    <div className="flex flex-col">
                        <Accordion title="Visual Variant" icon={Layout} badge={selectedComponent.variant}>
                            <div className="grid grid-cols-3 gap-3">
                                {VARIANTS.map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => updateComponent(selectedComponent.id, { variant: v })}
                                        className={cn(
                                            "relative aspect-[4/3] rounded-xl border-2 transition-all flex items-center justify-center font-black text-[10px] uppercase italic tracking-tighter disabled:opacity-50",
                                            selectedComponent.variant === v
                                                ? "bg-foreground text-background border-foreground shadow-xl shadow-black/10 scale-105 z-10"
                                                : "bg-muted/10 border-border/40 hover:border-foreground/20 text-muted-foreground"
                                        )}
                                    >
                                        V{v.slice(1)}
                                        {selectedComponent.variant === v && (
                                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-background border-2 border-background flex items-center justify-center shadow-md">
                                                <Check size={8} strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </Accordion>

                        <Accordion title="Content Strategy" icon={Type} defaultOpen={true}>
                            <div className="space-y-6">
                                {Object.entries(selectedComponent.props).map(([key, value]) => {
                                    if (key === 'centered' || key === 'popular') return null;

                                    // Special rendering for arrays
                                    if (Array.isArray(value)) {
                                        return (
                                            <div key={key} className="space-y-4 pt-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground opacity-60">{getLabel(key)}</label>
                                                    <span className="text-[8px] px-2 py-0.5 rounded bg-muted font-bold text-muted-foreground uppercase">{value.length} items</span>
                                                </div>
                                                <div className="space-y-2">
                                                    {value.map((item: any, index: number) => {
                                                        const pathBase = `${key}.${index}`;
                                                        const isExpanded = expandedItem === pathBase;
                                                        const isFocused = editor.focusedPropKey?.startsWith(`${pathBase}.`);

                                                        return (
                                                            <div key={index} className={cn(
                                                                "rounded-2xl border transition-all duration-300 overflow-hidden",
                                                                isExpanded ? "bg-muted/30 border-foreground/10 mb-4" : "bg-background border-border/40 hover:border-foreground/20",
                                                                isFocused && "ring-1 ring-primary/30 border-primary/30"
                                                            )}>
                                                                <button
                                                                    onClick={() => setExpandedItem(isExpanded ? null : pathBase)}
                                                                    className="w-full flex items-center justify-between p-3"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-[10px] font-black">
                                                                            {index + 1}
                                                                        </div>
                                                                        <span className="text-[10px] font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px]">
                                                                            {item.name || item.title || item.question || item.label || `Item ${index + 1}`}
                                                                        </span>
                                                                    </div>
                                                                    <ChevronDown size={14} className={cn("text-muted-foreground transition-transform", isExpanded && "rotate-180")} />
                                                                </button>

                                                                {isExpanded && (
                                                                    <div className="p-4 pt-0 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                                                        {Object.entries(item).map(([subKey, subValue]) => {
                                                                            if (Array.isArray(subValue)) return null;
                                                                            const fullPath = `${pathBase}.${subKey}`;
                                                                            const isFocusedSub = editor.focusedPropKey === fullPath;

                                                                            return (
                                                                                <div key={subKey} className="space-y-1.5">
                                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-80">{getLabel(subKey)}</label>
                                                                                    {typeof subValue === 'string' && (subKey === 'content' || subKey === 'answer' || subKey === 'quote') ? (
                                                                                        <textarea
                                                                                            value={subValue}
                                                                                            onChange={(e) => updateComponent(selectedComponent.id, { props: { [fullPath]: e.target.value } })}
                                                                                            className={cn(
                                                                                                "w-full text-[11px] p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/10 border-border/60 outline-none min-h-[80px] resize-none transition-all font-medium",
                                                                                                isFocusedSub && "border-primary/50 ring-2 ring-primary/5"
                                                                                            )}
                                                                                        />
                                                                                    ) : subKey === 'avatar' || subKey === 'icon' ? (
                                                                                        <div
                                                                                            onClick={() => openAssetsManager({ id: selectedComponent.id, prop: fullPath, type: subKey === 'avatar' ? 'image' : 'icon' })}
                                                                                            className="h-10 rounded-xl border border-border/60 bg-background flex items-center px-3 gap-3 cursor-pointer hover:border-primary/40 transition-all group"
                                                                                        >
                                                                                            <div className="size-6 rounded-md bg-muted overflow-hidden flex items-center justify-center">
                                                                                                <img src={subValue as string} className="w-full h-full object-cover" />
                                                                                            </div>
                                                                                            <span className="text-[10px] font-bold opacity-60 group-hover:opacity-100 italic transition-opacity">Replace Asset</span>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <input
                                                                                            type="text"
                                                                                            value={subValue as string}
                                                                                            onChange={(e) => updateComponent(selectedComponent.id, { props: { [fullPath]: e.target.value } })}
                                                                                            className={cn(
                                                                                                "w-full text-[11px] px-3 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-primary/10 border-border/60 outline-none transition-all font-bold",
                                                                                                isFocusedSub && "border-primary/50 ring-2 ring-primary/5"
                                                                                            )}
                                                                                        />
                                                                                    )}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    }

                                    const isFocused = editor.focusedPropKey === key;

                                    return (
                                        <div key={key} className="space-y-2">
                                            <div className="flex items-center justify-between px-1">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground opacity-60 leading-none">{getLabel(key)}</label>
                                            </div>
                                            {key === 'content' || key === 'subtitle' || key === 'description' ? (
                                                <textarea
                                                    value={value as string}
                                                    onChange={(e) => updateComponent(selectedComponent.id, { props: { [key]: e.target.value } })}
                                                    className={cn(
                                                        "w-full text-[11px] p-4 rounded-2xl border bg-muted/20 focus:bg-background focus:ring-4 focus:ring-foreground/5 border-transparent focus:border-border/60 outline-none min-h-[120px] resize-none transition-all font-medium leading-relaxed",
                                                        isFocused && "border-primary/50 ring-4 ring-primary/5"
                                                    )}
                                                />
                                            ) : key.toLowerCase().includes('image') || key.toLowerCase().includes('icon') ? (
                                                <div
                                                    onClick={() => openAssetsManager({ id: selectedComponent.id, prop: key, type: key.toLowerCase().includes('icon') ? 'icon' : 'image' })}
                                                    className={cn(
                                                        "group relative h-28 rounded-2xl border-2 border-dashed border-border/40 overflow-hidden cursor-pointer hover:border-primary/50 transition-all bg-muted/10 flex items-center justify-center",
                                                        isFocused && "border-primary border-solid scale-[1.02] shadow-xl shadow-primary/5"
                                                    )}
                                                >
                                                    {value ? (
                                                        <>
                                                            <img src={value as string} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                            <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <span className="text-[10px] font-black text-foreground uppercase tracking-widest bg-background px-3 py-1.5 rounded-full shadow-lg border border-border/20">Replace Brand Asset</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                                                            <ImageIcon size={20} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Select Asset</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={value as string}
                                                    onChange={(e) => updateComponent(selectedComponent.id, { props: { [key]: e.target.value } })}
                                                    className={cn(
                                                        "w-full text-xs px-4 py-3 rounded-2xl border bg-muted/20 focus:bg-background focus:ring-4 focus:ring-foreground/5 border-transparent focus:border-border/60 outline-none transition-all font-black italic tracking-tight",
                                                        isFocused && "border-primary/50 ring-4 ring-primary/5 bg-background shadow-lg shadow-primary/5"
                                                    )}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </Accordion>

                        <Accordion title="Design DNA" icon={Palette} defaultOpen={false}>
                            <div className="space-y-6">
                                {/* Alignment */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Layout Alignment</label>
                                    <div className="flex bg-muted/20 rounded-2xl p-1 gap-1 border border-border/20">
                                        {['left', 'center', 'right'].map((align) => (
                                            <button
                                                key={align}
                                                onClick={() => updateComponent(selectedComponent.id, { styles: { ...selectedComponent.styles, textAlign: align as any } })}
                                                className={cn(
                                                    "flex-1 text-[10px] py-2 rounded-xl capitalize transition-all font-black uppercase tracking-widest",
                                                    (selectedComponent.styles.textAlign === align || (!selectedComponent.styles.textAlign && align === 'center'))
                                                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 translate-z-10"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {align}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Popular Switch for specific components */}
                                {selectedComponent.props.popular !== undefined && (
                                    <Switch
                                        label="Highlight Section"
                                        checked={!!selectedComponent.props.popular}
                                        onChange={(v) => updateComponent(selectedComponent.id, { props: { popular: v } })}
                                    />
                                )}

                                {/* Glassmorphism */}
                                <Switch
                                    label="Blur Background"
                                    checked={selectedComponent.styles.glassmorphism}
                                    onChange={(v) => updateComponent(selectedComponent.id, { styles: { ...selectedComponent.styles, glassmorphism: v } })}
                                />
                            </div>
                        </Accordion>
                    </div>
                ) : (
                    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                        <Accordion title="Search Settings" icon={Search} defaultOpen={true}>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 leading-none">Global Page Title</label>
                                    <input
                                        type="text"
                                        value={layout.seo?.title || ''}
                                        onChange={(e) => setSEO({ title: e.target.value })}
                                        className="w-full text-xs px-4 py-3 rounded-2xl border bg-muted/20 focus:bg-background focus:ring-4 focus:ring-primary/5 border-transparent focus:border-primary/40 outline-none transition-all font-black italic tracking-tight"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 leading-none">Meta Description</label>
                                    <textarea
                                        value={layout.seo?.description || ''}
                                        onChange={(e) => setSEO({ description: e.target.value })}
                                        className="w-full text-xs p-4 rounded-2xl border bg-muted/20 focus:bg-background focus:ring-4 focus:ring-primary/5 border-transparent focus:border-primary/40 outline-none min-h-[120px] resize-none transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </Accordion>

                        <Accordion title="Brand Visuals" icon={Palette} defaultOpen={true}>
                            <div className="space-y-6 pb-2">
                                {/* Theme Color */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Primary Brand Color</label>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-10 h-10 rounded-2xl border-4 border-muted/50 shadow-xl cursor-pointer transition-transform hover:scale-110 relative overflow-hidden group"
                                            style={{ backgroundColor: layout.theme.primaryColor }}
                                        >
                                            <input
                                                type="color"
                                                value={layout.theme.primaryColor}
                                                onChange={(e) => setThemeColor(e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer scale-[5]"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                                <Palette size={14} className="text-white drop-shadow-md" />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-muted/20 border border-transparent hover:border-border transition-all">
                                            <span className="text-xs font-black italic uppercase tracking-tighter">{layout.theme.primaryColor}</span>
                                            <ExternalLink size={10} className="text-muted-foreground opacity-40" />
                                        </div>
                                    </div>
                                </div>

                                {/* Font Selection */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Global Typography</label>
                                    <div className="grid grid-cols-1 gap-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 p-1">
                                        {GOOGLE_FONTS.map(font => (
                                            <button
                                                key={font}
                                                onClick={() => setTheme({ fontFamily: font })}
                                                className={cn(
                                                    "w-full text-left px-4 py-3 rounded-xl text-xs transition-all flex items-center justify-between group border-2",
                                                    layout.theme.fontFamily === font
                                                        ? "bg-foreground text-background border-foreground shadow-xl scale-[1.02] z-10"
                                                        : "bg-muted/10 border-transparent hover:border-border/60 hover:bg-muted/20"
                                                )}
                                                style={{ fontFamily: font }}
                                            >
                                                <span className="font-medium tracking-tight">{font}</span>
                                                {layout.theme.fontFamily === font && <Check size={10} strokeWidth={4} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t bg-background/80 backdrop-blur-xl flex flex-col gap-3">
                {activeTab === 'design' && selectedComponent ? (
                    <>
                        <div className="flex gap-2">
                            <button
                                onClick={() => confirm('Revert all changes?') && resetComponent(selectedComponent.id)}
                                className="flex-1 h-12 rounded-2xl bg-muted/30 hover:bg-muted/50 text-[10px] font-black uppercase tracking-widest transition-all border border-transparent hover:border-border/40 text-muted-foreground flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={14} />
                                Reset
                            </button>
                            <button
                                onClick={() => selectComponent(null)}
                                className="flex-[2] h-12 rounded-2xl bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-black/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Check size={16} strokeWidth={4} />
                                Apply Changes
                            </button>
                        </div>
                    </>
                ) : (
                    <button
                        className="w-full h-12 rounded-2xl bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-black/20 transition-all flex items-center justify-center gap-2"
                    >
                        <PanelBottom size={16} />
                        Publish Site
                    </button>
                )}
            </div>
        </aside>
    );
};