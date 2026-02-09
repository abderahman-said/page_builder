import React from 'react';
import { useStore, GOOGLE_FONTS } from '../../store/useStore';
import {
    Trash2,
    Sliders,
    Type,
    Palette,
    Layers,
    ChevronRight,
    Layout,
    Check,
    Globe,
    Search,
    Image as ImageIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const SidebarRight: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'component' | 'page'>('component');
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

    const VARIANTS = ['v1', 'v2', 'v3'];

    // Auto-switch to page tab if no component is selected
    React.useEffect(() => {
        if (!selectedComponent) {
            setActiveTab('page');
        } else {
            setActiveTab('component');
        }
    }, [selectedComponent?.id]);

    return (
        <aside className="w-[320px] border-l bg-background flex flex-col z-20 shadow-[inset_1px_0_0_0_rgba(0,0,0,0.05)] relative">
            {/* Header */}
            <div className="p-5 border-b flex items-center justify-between bg-background sticky top-0 z-10">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-foreground text-background">
                        {activeTab === 'component' ? <Sliders size={14} /> : <Globe size={14} />}
                    </div>
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest leading-none">
                            {activeTab === 'component' ? 'Component' : 'Page'} Settings
                        </h2>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tighter">
                            {activeTab === 'component' && selectedComponent ? `${selectedComponent.type} block` : 'Global Configuration'}
                        </span>
                    </div>
                </div>
                {activeTab === 'component' && selectedComponent && (
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this block?')) {
                                removeComponent(selectedComponent.id);
                            }
                        }}
                        className="p-2 rounded-lg hover:bg-destructive/5 text-muted-foreground hover:text-destructive transition-all group"
                        title="Delete section"
                    >
                        <Trash2 size={15} />
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-muted/20 p-1 gap-1">
                <button
                    onClick={() => selectedComponent && setActiveTab('component')}
                    disabled={!selectedComponent}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                        activeTab === 'component'
                            ? "bg-background shadow-sm text-foreground ring-1 ring-border/20"
                            : "text-muted-foreground hover:text-foreground disabled:opacity-30"
                    )}
                >
                    <Sliders size={12} />
                    Block
                </button>
                <button
                    onClick={() => setActiveTab('page')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                        activeTab === 'page'
                            ? "bg-background shadow-sm text-foreground ring-1 ring-border/20"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Globe size={12} />
                    Page
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'component' && selectedComponent ? (
                    <>
                        {/* Variant Selector */}
                        <section className="p-5 border-b space-y-4">
                            <div className="flex items-center gap-2">
                                <Layout size={14} className="text-muted-foreground" />
                                <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">Section Variant</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {VARIANTS.map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => updateComponent(selectedComponent.id, { variant: v })}
                                        className={cn(
                                            "relative h-12 rounded-lg border transition-all flex items-center justify-center font-bold text-xs group",
                                            selectedComponent.variant === v
                                                ? "bg-foreground text-background border-foreground shadow-lg shadow-black/10"
                                                : "bg-muted/30 border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {v.toUpperCase()}
                                        {selectedComponent.variant === v && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground text-background border-2 border-background flex items-center justify-center">
                                                <Check size={8} strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <div className="p-5 space-y-8">
                            {/* Content Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Type size={14} className="text-muted-foreground" />
                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">Content</h3>
                                </div>

                                <div className="grid gap-5">
                                    {Object.entries(selectedComponent.props).map(([key, value]) => {
                                        if (key === 'items' || key === 'centered' || key === 'popular' || key === 'links') return null;

                                        return (
                                            <div key={key} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 leading-none">{key.replace(/([A-Z])/g, ' $1')}</label>
                                                    <span className="text-[9px] text-muted-foreground/60 font-mono">TEXT</span>
                                                </div>
                                                {key === 'content' || key === 'subtitle' ? (
                                                    <textarea
                                                        value={value}
                                                        onChange={(e) => updateComponent(selectedComponent.id, {
                                                            props: { ...selectedComponent.props, [key]: e.target.value }
                                                        })}
                                                        className="w-full text-xs p-3 rounded-xl border bg-muted/20 focus:bg-background focus:ring-2 focus:ring-foreground/5 border-transparent focus:border-border outline-none min-h-[100px] resize-none transition-all shadow-inner font-medium leading-relaxed"
                                                    />
                                                ) : key.toLowerCase().includes('image') || key.toLowerCase().includes('icon') ? (
                                                    <div
                                                        onClick={() => openAssetsManager({ id: selectedComponent.id, prop: key, type: key.toLowerCase().includes('icon') ? 'icon' : 'image' })}
                                                        className="group relative h-24 rounded-xl border-2 border-dashed border-border overflow-hidden cursor-pointer hover:border-primary/50 transition-all bg-muted/10 flex items-center justify-center"
                                                    >
                                                        {value ? (
                                                            <>
                                                                <img src={value} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change Asset</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors">
                                                                <Palette size={16} />
                                                                <span className="text-[10px] font-bold uppercase tracking-widest">Select Asset</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => updateComponent(selectedComponent.id, {
                                                            props: { ...selectedComponent.props, [key]: e.target.value }
                                                        })}
                                                        className="w-full text-xs px-3 py-2.5 rounded-xl border bg-muted/20 focus:bg-background focus:ring-2 focus:ring-foreground/5 border-transparent focus:border-border outline-none transition-all shadow-inner font-bold"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Styles Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Palette size={14} className="text-muted-foreground" />
                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">Design & Layout</h3>
                                </div>

                                <div className="grid gap-6">
                                    {/* Alignment */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Alignment</label>
                                        <div className="flex bg-muted/30 rounded-xl p-1 gap-1 border border-border/40">
                                            {['left', 'center', 'right'].map((align) => (
                                                <button
                                                    key={align}
                                                    onClick={() => updateComponent(selectedComponent.id, {
                                                        styles: { ...selectedComponent.styles, textAlign: align as any }
                                                    })}
                                                    className={cn(
                                                        "flex-1 text-[10px] py-2 rounded-lg capitalize transition-all font-bold",
                                                        (selectedComponent.styles.textAlign === align || (!selectedComponent.styles.textAlign && align === 'center'))
                                                            ? "bg-background text-foreground shadow-sm ring-1 ring-border/20"
                                                            : "text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    {align}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Glassmorphism */}
                                    <div
                                        onClick={() => updateComponent(selectedComponent.id, {
                                            styles: { ...selectedComponent.styles, glassmorphism: !selectedComponent.styles.glassmorphism }
                                        })}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group",
                                            selectedComponent.styles.glassmorphism
                                                ? "bg-primary/10 border-primary/20 shadow-sm"
                                                : "bg-muted/20 border-transparent hover:border-border"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Layers size={14} className={cn(selectedComponent.styles.glassmorphism ? "text-primary" : "text-muted-foreground")} />
                                            <span className={cn("text-[10px] font-bold uppercase tracking-widest", selectedComponent.styles.glassmorphism ? "text-primary" : "text-foreground")}>Glassmorphism</span>
                                        </div>
                                        <div className={cn(
                                            "w-8 h-4 rounded-full relative transition-colors duration-200",
                                            selectedComponent.styles.glassmorphism ? "bg-primary" : "bg-muted-foreground/20"
                                        )}>
                                            <div className={cn(
                                                "absolute top-1 bottom-1 w-2 rounded-full bg-background shadow-sm transition-all duration-200",
                                                selectedComponent.styles.glassmorphism ? "left-5" : "left-1"
                                            )} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-5 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* SEO Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Search size={14} className="text-muted-foreground" />
                                <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">Search Engine Optimization</h3>
                            </div>

                            <div className="grid gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 leading-none">Page Title</label>
                                    <input
                                        type="text"
                                        value={layout.seo?.title || ''}
                                        onChange={(e) => setSEO({ title: e.target.value })}
                                        placeholder="e.g., My Awesome Product"
                                        className="w-full text-xs px-3 py-2.5 rounded-xl border bg-muted/20 focus:bg-background focus:ring-2 focus:ring-primary/20 border-transparent focus:border-primary outline-none transition-all shadow-inner font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 leading-none">Meta Description</label>
                                    <textarea
                                        value={layout.seo?.description || ''}
                                        onChange={(e) => setSEO({ description: e.target.value })}
                                        placeholder="Briefly describe your page for search results..."
                                        className="w-full text-xs p-3 rounded-xl border bg-muted/20 focus:bg-background focus:ring-2 focus:ring-primary/20 border-transparent focus:border-primary outline-none min-h-[100px] resize-none transition-all shadow-inner font-medium leading-relaxed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 leading-none">Social Share Image (OG)</label>
                                    <div
                                        onClick={() => openAssetsManager({ id: 'seo', prop: 'ogImage', type: 'image' })}
                                        className="group relative h-32 rounded-xl border-2 border-dashed border-border overflow-hidden cursor-pointer hover:border-primary/50 transition-all bg-muted/10 flex items-center justify-center"
                                    >
                                        {layout.seo?.ogImage ? (
                                            <>
                                                <img src={layout.seo.ogImage} alt="OG Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change Image</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors text-center p-4">
                                                <ImageIcon size={20} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Select OG Image</span>
                                                <p className="text-[8px] opacity-70 mt-1 uppercase font-bold tracking-tighter">Recommended: 1200x630</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Global Styles */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Palette size={14} className="text-muted-foreground" />
                                <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">Global Visuals</h3>
                            </div>

                            <div className="grid gap-6">
                                {/* Theme Color */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Primary Brand Color</label>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full border-4 border-muted/50 shadow-lg cursor-pointer transition-transform hover:scale-110 relative overflow-hidden"
                                            style={{ backgroundColor: layout.theme.primaryColor }}
                                        >
                                            <input
                                                type="color"
                                                value={layout.theme.primaryColor}
                                                onChange={(e) => setThemeColor(e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-muted/20 border border-transparent hover:border-border transition-all group relative">
                                            <span className="text-[11px] font-mono font-bold uppercase">{layout.theme.primaryColor}</span>
                                            <ChevronRight size={12} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                                            <input
                                                type="color"
                                                value={layout.theme.primaryColor}
                                                onChange={(e) => setThemeColor(e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Font Selection */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Typography</label>
                                    <div className="grid grid-cols-1 gap-1.5 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                                        {GOOGLE_FONTS.map(font => (
                                            <button
                                                key={font}
                                                onClick={() => {
                                                    setTheme({ fontFamily: font });
                                                }}
                                                className={cn(
                                                    "w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between group border",
                                                    layout.theme.fontFamily === font
                                                        ? "bg-foreground text-background border-foreground shadow-md"
                                                        : "bg-muted/10 border-transparent hover:border-border hover:bg-muted/20"
                                                )}
                                                style={{ fontFamily: font }}
                                            >
                                                <span>{font}</span>
                                                {layout.theme.fontFamily === font && <Check size={10} strokeWidth={4} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Actions */}
            {activeTab === 'component' && selectedComponent ? (
                <div className="p-4 border-t bg-background/80 backdrop-blur-md sticky bottom-0 flex gap-2">
                    <button
                        onClick={() => {
                            if (confirm('Revert all changes to this block to defaults?')) {
                                resetComponent(selectedComponent.id);
                            }
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 text-xs font-bold transition-all border border-transparent hover:border-border"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => selectComponent(null)}
                        className="flex-[2] py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:shadow-xl hover:shadow-primary/20 transition-all border border-primary/20"
                    >
                        Apply Changes
                    </button>
                </div>
            ) : (
                <div className="p-4 border-t bg-background/80 backdrop-blur-md sticky bottom-0 flex gap-2">
                    <button
                        className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:shadow-xl hover:shadow-primary/20 transition-all border border-primary/20 flex items-center justify-center gap-2"
                    >
                        <Check size={14} />
                        Done Editing Page
                    </button>
                </div>
            )}
        </aside>
    );
};