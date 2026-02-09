import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight, Video, ChevronDown, User } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import type { BaseComponentProps } from './shared-types';

interface HeroProps extends BaseComponentProps {
    title: string;
    subtitle: string;
    buttonText: string;
    image?: string;
}

export const Hero: React.FC<HeroProps> = ({ id, title, subtitle, buttonText, image, variant, styles, isExport }) => {
    if (variant === 'pixels') {
        return (
            <section className="relative pt-40 pb-32 px-6 md:px-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-600/20 blur-[150px] rounded-full -z-10 pointer-events-none" />

                <div className="text-center max-w-[85%] mx-auto">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-500 text-sm font-medium mb-10">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                        </span>
                        New features available
                        <ChevronRight className="size-4" />
                    </div>

                    <EditableText id={id} propKey="title" value={title} as="h1" className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-8 leading-[1.05]" isExport={isExport} />
                    <EditableText id={id} propKey="subtitle" value={subtitle} as="p" className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed" isExport={isExport} />

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <EditableText id={id} propKey="buttonText" value={buttonText} as="button" className="px-10 py-5 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-lg font-bold transition-all shadow-xl shadow-pink-600/25 flex items-center gap-3 group hover:scale-105 active:scale-95" isExport={isExport} />
                        <button className="px-10 py-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-lg font-bold transition-all flex items-center gap-3 hover:scale-105 active:scale-95">
                            <Video className="size-6 text-slate-400" />
                            Watch Demo
                        </button>
                    </div>
                </div>

                <div className="mt-20 relative max-w-[90%] mx-auto rounded-[32px] border border-white/10 bg-slate-950/50 backdrop-blur-sm p-6 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                    <img
                        src={image || "pixels/hero-section-showcase.png"}
                        alt="Dashboard Preview"
                        className="w-full rounded-2xl shadow-2xl bg-slate-900 aspect-video object-cover"
                    />
                </div>
            </section>
        );
    }

    if (variant === 'v2') {
        return (
            <section className={cn(
                "py-24 px-6 md:px-12 text-center relative overflow-hidden transition-all",
                styles?.glassmorphism
                    ? "bg-background/40 backdrop-blur-xl border-y border-white/10"
                    : "bg-background"
            )}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[500px] bg-primary/20 blur-[120px] -z-10 rounded-full mix-blend-screen pointer-events-none" />
                <div className="max-w-4xl mx-auto space-y-8">
                    <a href="#" className="inline-flex items-center gap-2 px-1 py-1 pr-3 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary hover:bg-primary/20 transition-all mb-8 mx-auto w-max group">
                        <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">New</span>
                        <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                            Try 30 days free trial
                            <ChevronDown className="-rotate-90" size={12} />
                        </span>
                    </a>
                    <EditableText
                        id={id}
                        propKey="title"
                        value={title}
                        as="h1"
                        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1] text-foreground"
                        isExport={isExport}
                    />
                    <EditableText
                        id={id}
                        propKey="subtitle"
                        value={subtitle}
                        as="p"
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        isExport={isExport}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
                        <button className="px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2">
                            <EditableText id={id} propKey="buttonText" value={buttonText} as="span" isExport={isExport} />
                        </button>
                        <button className="px-8 py-3.5 bg-background text-foreground border border-border/50 font-medium rounded-full hover:bg-muted/50 transition-all text-sm flex items-center gap-2 group">
                            <div className="p-1 rounded bg-muted group-hover:bg-foreground group-hover:text-background transition-colors">
                                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-current border-b-[3px] border-b-transparent ml-0.5" />
                            </div>
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={cn(
            "py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 transition-all min-h-[80vh]",
            styles?.glassmorphism
                ? "bg-background/40 backdrop-blur-xl"
                : "bg-background",
            styles?.textAlign && `text-${styles.textAlign}`
        )}>
            <div className="flex-1 space-y-8">
                <EditableText
                    id={id}
                    propKey="title"
                    value={title}
                    as="h1"
                    className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-foreground"
                    isExport={isExport}
                />
                <EditableText
                    id={id}
                    propKey="subtitle"
                    value={subtitle}
                    as="p"
                    className="text-xl text-muted-foreground max-w-xl leading-relaxed font-medium"
                    isExport={isExport}
                />
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-sm uppercase tracking-wider">
                        <EditableText id={id} propKey="buttonText" value={buttonText} as="span" isExport={isExport} />
                    </button>
                    <div className="flex -space-x-3 items-center ml-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="size-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                                <User size={20} className="text-muted-foreground" />
                            </div>
                        ))}
                        <div className="ml-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            Join 2,000+ creators
                        </div>
                    </div>
                </div>
            </div>
            {image && (
                <div className="flex-1 w-full max-w-xl aspect-[4/3] relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <img src={image} alt="Hero" className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-1000" />
                </div>
            )}
        </section>
    );
};
