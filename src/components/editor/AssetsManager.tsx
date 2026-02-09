import React from 'react';
import {
    X,
    Search,
    Image as ImageIcon,
    Cloud,
    Check,
    Command,
    ExternalLink,
    Loader2,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

const SAMPLE_IMAGES = [
    { id: '1', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', title: 'Business Dashboard' },
    { id: '2', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', title: 'Developer Workspace' },
    { id: '3', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', title: 'Marketing Analytics' },
    { id: '4', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80', title: 'Team Meeting' },
    { id: '5', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', title: 'Collaborative Work' },
    { id: '6', url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80', title: 'SaaS Platform' },
];

export const AssetsManager: React.FC = () => {
    const {
        editor,
        closeAssetsManager,
        selectAsset
    } = useStore();

    const [search, setSearch] = React.useState('');
    const [activeTab, setActiveTab] = React.useState<'images' | 'icons'>('images');
    const [isLoading, setIsLoading] = React.useState(false);

    if (!editor.assetsManager.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                onClick={closeAssetsManager}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl max-h-[85vh] bg-background border rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="p-6 border-b bg-background flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold leading-none capitalize">{editor.assetsManager.target?.type || 'Asset'} Manager</h2>
                            <p className="text-xs text-muted-foreground font-medium mt-1">Select or upload media for your project</p>
                        </div>
                    </div>
                    <button
                        onClick={closeAssetsManager}
                        className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search & Tabs */}
                <div className="p-4 border-b bg-muted/20 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search assets, colors, or categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-background border px-10 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border bg-muted/50 text-[10px] text-muted-foreground font-mono">
                            <Command size={10} />
                            <span>K</span>
                        </div>
                    </div>

                    <div className="flex bg-background border p-1 rounded-xl shadow-inner">
                        <button
                            onClick={() => setActiveTab('images')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                activeTab === 'images' ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <ImageIcon size={14} />
                            Images
                        </button>
                        <button
                            onClick={() => setActiveTab('icons')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                activeTab === 'icons' ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Cloud size={14} />
                            Icons
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-muted/5">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {SAMPLE_IMAGES.map((img) => (
                            <div
                                key={img.id}
                                onClick={() => {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        selectAsset(img.url);
                                        setIsLoading(false);
                                    }, 500);
                                }}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
                            >
                                {isLoading && (
                                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                                        <Loader2 className="animate-spin" size={24} />
                                    </div>
                                )}
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all">
                                    <p className="text-white text-[11px] font-bold truncate">{img.title}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-[9px] text-white/70 font-bold uppercase tracking-widest">Unsplash Image</span>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg scale-75 group-hover:scale-100">
                                    <Check size={16} />
                                </div>
                            </div>
                        ))}

                        {/* Upload Placeholder */}
                        <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:bg-muted/30 transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform">
                                <Cloud size={24} />
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-foreground">Custom URL</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">Paste link to use any image</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <ExternalLink size={12} />
                        <span>Connected to Unsplash Library</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={closeAssetsManager}
                            className="px-4 py-2 text-xs font-bold hover:bg-muted rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setIsLoading(true);
                                const url = prompt('Enter image URL:');
                                if (url) {
                                    setTimeout(() => {
                                        selectAsset(url);
                                        setIsLoading(false);
                                    }, 500);
                                } else {
                                    setIsLoading(false);
                                }
                            }}
                            disabled={isLoading}
                            className="px-6 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={14} />
                                    Adding...
                                </div>
                            ) : (
                                'Add via URL'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
