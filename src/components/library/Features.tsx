import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowUpRight, Check } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';
import type { BaseComponentProps, FeatureItem } from './shared-types';

interface FeaturesProps extends BaseComponentProps {
    title: string;
    badgeText?: string;
    subtitle?: string;
    description?: string;
    showcaseTitle?: string;
    showcaseDescription?: string;
    linkText?: string;
    items: FeatureItem[];
}

export const Features: React.FC<FeaturesProps> = ({
    id,
    title,
    badgeText = 'Features',
    subtitle,
    showcaseTitle,
    showcaseDescription,
    linkText = 'Learn more',
    items,
    styles,
    variant,
    isExport
}) => {
    if (variant === 'pixels') {
        return (
            <section className="py-32 px-6 md:px-10 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20 items-start">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-pink-950/70 border border-pink-800 text-pink-500 text-xs font-bold uppercase tracking-[0.2em]">
                                <EditableText id={id} propKey="badgeText" value={badgeText} as="span" isExport={isExport} />
                            </div>
                            <EditableText id={id} propKey="title" value={title} as="h2" className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none" isExport={isExport} />
                            {subtitle && <EditableText id={id} propKey="subtitle" value={subtitle} as="p" className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed" isExport={isExport} />}

                            <div className="flex flex-col gap-6 pt-8">
                                {items?.map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="mt-1 size-8 rounded-xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                        <div className="space-y-2">
                                            <EditableText id={id} propKey={`items.${i}.title`} value={item.title} as="h4" className="text-2xl font-bold text-white tracking-tight" isExport={isExport} />
                                            <EditableText id={id} propKey={`items.${i}.content`} value={item.content} as="p" className="text-slate-400 text-lg leading-relaxed" isExport={isExport} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:max-w-xl">
                            {items?.map((item, i) => (
                                <div key={i} className={cn(
                                    "p-10 rounded-[40px] border transition-all duration-500 group relative overflow-hidden",
                                    item.highlight
                                        ? "bg-gradient-to-br from-pink-600 to-pink-700 border-pink-500 shadow-2xl shadow-pink-600/20 lg:-mt-12 lg:mb-12"
                                        : "bg-slate-950 border-white/5 hover:border-pink-500/30 shadow-xl"
                                )}>
                                    <div className={cn(
                                        "size-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3",
                                        item.highlight ? "bg-white/20 text-white" : "bg-pink-600/10 text-pink-500"
                                    )}>
                                        <EditableImage
                                            id={id}
                                            propKey={`items.${i}.icon`}
                                            src={item.icon || ''}
                                            className="size-8"
                                            aspectRatio="aspect-square"
                                            isExport={isExport}
                                        />
                                    </div>
                                    <EditableText id={id} propKey={`items.${i}.title`} value={item.title} as="h4" className={cn("text-2xl font-bold tracking-tight mb-4", item.highlight ? "text-white" : "text-white")} isExport={isExport} />
                                    <EditableText id={id} propKey={`items.${i}.content`} value={item.content} as="p" className={cn("text-lg leading-relaxed", item.highlight ? "text-pink-100" : "text-slate-400")} isExport={isExport} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-40 p-12 md:p-24 rounded-[64px] bg-slate-900/50 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 max-w-3xl">
                            <EditableText id={id} propKey="showcaseTitle" value={showcaseTitle || ''} as="h3" className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8" isExport={isExport} />
                            <EditableText id={id} propKey="showcaseDescription" value={showcaseDescription || ''} as="p" className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-12" isExport={isExport} />
                            <button className="flex items-center gap-3 text-pink-500 font-bold group/btn text-xl">
                                <EditableText id={id} propKey="linkText" value={linkText} as="span" isExport={isExport} />
                                <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={cn(
            "py-24 px-6 md:px-12 transition-all",
            styles?.glassmorphism ? "bg-background/40 backdrop-blur-xl" : "bg-background"
        )}>
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <EditableText id={id} propKey="badgeText" value={badgeText} as="span" className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20" isExport={isExport} />
                    <EditableText id={id} propKey="title" value={title} as="h2" className="text-4xl md:text-6xl font-black tracking-tighter text-foreground" isExport={isExport} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {items?.map((item, i) => (
                        <div key={i} className="group space-y-4">
                            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3">
                                <EditableImage
                                    id={id}
                                    propKey={`items.${i}.icon`}
                                    src={item.icon || ''}
                                    className="size-6"
                                    aspectRatio="aspect-square"
                                    isExport={isExport}
                                />
                            </div>
                            <EditableText id={id} propKey={`items.${i}.title`} value={item.title} as="h3" className="text-xl font-bold tracking-tight text-foreground" isExport={isExport} />
                            <EditableText id={id} propKey={`items.${i}.content`} value={item.content} as="p" className="text-muted-foreground leading-relaxed font-medium" isExport={isExport} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
