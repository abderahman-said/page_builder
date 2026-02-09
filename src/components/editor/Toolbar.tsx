import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import {
    Monitor,
    Tablet,
    Smartphone,
    Undo2,
    Redo2,
    Download,
    Palette,
    Globe,
    ChevronDown,
    Save,
    History,
    Upload,
    FileJson,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateStandaloneHTML } from '../../lib/export';
import { generateZIPExport } from '../../lib/export/zip';
import { cn } from '../../lib/utils';
import { Archive } from 'lucide-react';

export const Toolbar: React.FC = () => {
    const [showHistory, setShowHistory] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const {
        editor,
        setPreviewMode,
        undo,
        redo,
        layout,
        setThemeColor,
        importLayout,
        saveVersion,
        loadVersion,
        isAutoSaving,
        lastSaveTime,
    } = useStore();

    const COLORS = [
        { name: 'أزرق', value: '#3b82f6', foreground: '#ffffff' },
        { name: 'نيلي', value: '#6366f1', foreground: '#ffffff' },
        { name: 'بنفسجي', value: '#8b5cf6', foreground: '#ffffff' },
        { name: 'وردي', value: '#f43f5e', foreground: '#ffffff' },
        { name: 'برتقالي', value: '#f59e0b', foreground: '#000000' },
        { name: 'أخضر', value: '#10b981', foreground: '#ffffff' },
    ];

    const handleExportHTML = async () => {
        setIsExporting(true);
        try {
            // Small delay for better visual feedback
            await new Promise(resolve => setTimeout(resolve, 800));

            const htmlContent = generateStandaloneHTML(layout);
            const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
            const filename = `${layout.name.toLowerCase().replace(/\s+/g, '-') || 'page'}.html`;

            saveAs(blob, filename);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportZIP = async () => {
        setIsExporting(true);
        try {
            // Small delay for better visual feedback
            await new Promise(resolve => setTimeout(resolve, 1000));

            const blob = await generateZIPExport(layout);
            const filename = `${layout.name.toLowerCase().replace(/\s+/g, '-') || 'project'}.zip`;

            saveAs(blob, filename);
        } catch (error) {
            console.error('ZIP Export failed:', error);
            alert('ZIP Export failed. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(layout, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${layout.name.toLowerCase().replace(/\s+/g, '-')}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleImportJSON = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                importLayout(event.target.result);
            };
            reader.readAsText(file);
        };
        input.click();
    };

    return (
        <header className="h-14 border-b bg-background flex items-center justify-between px-6 z-30 shadow-sm">
            <div className="flex items-center gap-8">
                {/* Logo & Project Name */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center text-background shadow-lg">
                        <span className="text-sm font-bold">B</span>
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="text-sm font-bold leading-tight truncate max-w-[120px]">{layout.name}</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Live Editor</span>
                        </div>
                    </div>
                </div>

                <div className="h-6 w-px bg-border/60" />

                {/* Auto-save indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium">
                    {isAutoSaving ? (
                        <>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-600">Saving...</span>
                        </>
                    ) : lastSaveTime ? (
                        <>
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-muted-foreground">Saved</span>
                        </>
                    ) : (
                        <span className="text-muted-foreground">Ready</span>
                    )}
                </div>

                <div className="h-6 w-px bg-border/60" />

                {/* Viewport Toggles */}
                <div className="flex items-center bg-muted/30 p-1 rounded-lg border border-border/50">
                    <button
                        onClick={() => setPreviewMode('desktop')}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium",
                            editor.previewMode === 'desktop' ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-border/20" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Monitor size={14} />
                        <span className="hidden lg:inline">Desktop</span>
                    </button>
                    <button
                        onClick={() => setPreviewMode('tablet')}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium",
                            editor.previewMode === 'tablet' ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-border/20" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Tablet size={14} />
                        <span className="hidden lg:inline">Tablet</span>
                    </button>
                    <button
                        onClick={() => setPreviewMode('mobile')}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium",
                            editor.previewMode === 'mobile' ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-border/20" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Smartphone size={14} />
                        <span className="hidden lg:inline">Mobile</span>
                    </button>
                </div>

                {/* <div className="h-6 w-px bg-border/60" /> */}

                {/* Theme Mode Toggle */}
                {/* <div className="flex items-center bg-muted/30 p-1 rounded-lg border border-border/50">
                    <button
                        onClick={() => setThemeMode('light')}
                        className={cn(
                            "p-1.5 rounded-md transition-all",
                            layout.theme.mode === 'light' ? "bg-background shadow-md text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                        title="Light Mode"
                    >
                        <Sun size={14} />
                    </button>
                    <button
                        onClick={() => setThemeMode('dark')}
                        className={cn(
                            "p-1.5 rounded-md transition-all",
                            layout.theme.mode === 'dark' ? "bg-background shadow-md text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                        title="Dark Mode"
                    >
                        <Moon size={14} />
                    </button>
                </div> */}

                {/* Primary Color Picker */}
                <div className="flex items-center gap-3 bg-muted/30 p-1 px-3 rounded-lg border border-border/50">
                    <div className="flex  gap-1  mr-1">
                        <Palette size={12} className="text-muted-foreground" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Theme</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {COLORS.map(color => (
                            <button
                                key={color.value}
                                onClick={() => setThemeColor(color.value)}
                                className={cn(
                                    "w-6 h-6 rounded-full border-2 transition-all hover:scale-125 hover:rotate-12",
                                    layout.theme.primaryColor === color.value ? "border-foreground scale-110 shadow-lg" : "border-transparent"
                                )}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Advanced Operations Dropdown (History/Versioning) */}
                <div className="relative">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition-all",
                            showHistory ? "bg-foreground text-background border-foreground shadow-lg" : "bg-muted/20 border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
                        )}
                    >
                        <History size={14} />
                        <span className="hidden sm:inline">Versions</span>
                        <ChevronDown size={12} className={cn("transition-transform duration-200", showHistory ? "rotate-180" : "")} />
                    </button>

                    {showHistory && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowHistory(false)} />
                            <div className="absolute right-0 top-full mt-2 w-64 bg-background border rounded-xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Version History</h4>
                                    <button
                                        onClick={() => {
                                            const name = prompt('Name this version:', `Backup ${new Date().toLocaleTimeString()}`);
                                            if (name) saveVersion(name);
                                        }}
                                        className="p-1 px-2 rounded-md bg-primary/10 text-primary text-[10px] font-bold hover:bg-primary/20 transition-all flex items-center gap-1"
                                    >
                                        <Save size={10} />
                                        Save
                                    </button>
                                </div>
                                <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar -mx-2 px-2">
                                    {layout.versions?.length ? (
                                        layout.versions.map((ver) => (
                                            <div key={ver.id} className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-all cursor-pointer" onClick={() => loadVersion(ver.id)}>
                                                <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <FileJson size={14} />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[11px] font-bold truncate">{ver.name}</span>
                                                    <span className="text-[9px] text-muted-foreground">{new Date(ver.timestamp).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center opacity-40">
                                            <History size={24} className="mx-auto mb-2" />
                                            <p className="text-[10px] font-bold uppercase tracking-tighter">No snapshots saved</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="h-6 w-px bg-border/60 mx-1" />

                {/* History Controls */}
                <div className="flex items-center gap-1 bg-muted/20 p-1 rounded-lg border border-border/40">
                    <button
                        onClick={undo}
                        disabled={!editor.canUndo}
                        className="p-1.5 rounded-md hover:bg-background hover:shadow-sm disabled:opacity-20 disabled:cursor-not-allowed transition-all text-muted-foreground hover:text-foreground"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo2 size={16} />
                    </button>
                    <button
                        onClick={redo}
                        disabled={!editor.canRedo}
                        className="p-1.5 rounded-md hover:bg-background hover:shadow-sm disabled:opacity-20 disabled:cursor-not-allowed transition-all text-muted-foreground hover:text-foreground"
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo2 size={16} />
                    </button>
                </div>

                <div className="h-6 w-px bg-border/60 mx-1" />

                <div className="flex items-center gap-2">
                    {/* Secondary Actions Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-border bg-background hover:bg-muted/50 transition-all shadow-sm">
                            <Download size={15} />
                            Manage
                            <ChevronDown size={12} className="opacity-50" />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-1">
                            <button
                                onClick={handleExportHTML}
                                disabled={isExporting}
                                className={cn(
                                    "w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 text-xs font-bold transition-all text-left",
                                    isExporting && "opacity-50 cursor-wait"
                                )}
                            >
                                <Globe size={14} className={cn("text-muted-foreground", isExporting && "animate-spin")} />
                                {isExporting ? 'Exporting...' : 'Export as HTML'}
                            </button>
                            <button
                                onClick={handleExportZIP}
                                disabled={isExporting}
                                className={cn(
                                    "w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 text-xs font-bold transition-all text-left",
                                    isExporting && "opacity-50 cursor-wait"
                                )}
                            >
                                <Archive size={14} className={cn("text-muted-foreground", isExporting && "animate-pulse")} />
                                {isExporting ? 'Preparing ZIP...' : 'Export as ZIP'}
                            </button>
                            <button onClick={handleExportJSON} className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 text-xs font-bold transition-all text-left">
                                <FileJson size={14} className="text-muted-foreground" />
                                Export as JSON
                            </button>
                            <div className="h-px bg-border/60 my-1" />
                            <button onClick={handleImportJSON} className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 text-xs font-bold transition-all text-left">
                                <Upload size={14} className="text-muted-foreground" />
                                Import Layout
                            </button>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-lg hover:rotate-1 hover:scale-105 transition-all shadow-xl shadow-primary/20 border border-primary/20">
                        <Globe size={15} className="mr-0.5" />
                        Publish
                    </button>
                </div>
            </div>
        </header>
    );
};
