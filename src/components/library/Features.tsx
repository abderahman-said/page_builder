import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowUpRight, Check } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import type { BaseComponentProps, FeatureItem } from './shared-types';

interface FeaturesProps extends BaseComponentProps {
    title: string;
    items: FeatureItem[];
}

export const Features: React.FC<FeaturesProps> = ({ id, title, items, styles, variant, isExport }) => {
    if (variant === 'pixels') {
        return (
            <section id="features" className="px-6 md:px-10  scroll-mt-20 py-32">
                <p className="text-center font-bold text-pink-600 px-12 py-3 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto text-sm uppercase tracking-widest">
                    Features
                </p>
                <EditableText
                    id={id}
                    propKey="title"
                    value={title}
                    as="h3"
                    className="text-5xl md:text-7xl font-bold text-center mx-auto mt-8 text-white tracking-tight"
                    isExport={isExport}
                />
                <p className="text-slate-400 text-center mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                    Components, patterns and pages — everything you need to ship.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10 mt-24 px-6">
                    <div className="p-10 rounded-[32px] space-y-6 border border-slate-800 bg-slate-950 max-w-[400px] w-full hover:border-pink-500/50 transition-all duration-300 hover:scale-105 shadow-2xl">
                        <img alt="Lightning-fast setup" src="pixels/zap-icon.svg" className="w-16 h-16" />
                        <h3 className="text-2xl font-bold text-white leading-tight">Lightning-fast setup</h3>
                        <p className="text-slate-400 text-lg leading-relaxed pb-4">Launch production-ready pages in minutes with prebuilt components.</p>
                    </div>
                    <div className="p-px rounded-[33px] bg-gradient-to-br from-pink-600 to-slate-800 hover:scale-105 transition-transform duration-300">
                        <div className="p-10 rounded-[32px] space-y-6 border border-slate-800 bg-slate-950 max-w-[400px] w-full h-full shadow-2xl">
                            <img alt="Pixel perfect" src="pixels/thumb-icon.svg" className="w-16 h-16" />
                            <h3 className="text-2xl font-bold text-white leading-tight">Pixel perfect</h3>
                            <p className="text-slate-400 text-lg leading-relaxed pb-4">Modern Figma-driven UI that translates to exact code.</p>
                        </div>
                    </div>
                    <div className="p-10 rounded-[32px] space-y-6 border border-slate-800 bg-slate-950 max-w-[400px] w-full hover:border-pink-500/50 transition-all duration-300 hover:scale-105 shadow-2xl">
                        <img alt="Highly customizable" src="pixels/shape-icon.svg" className="w-16 h-16" />
                        <h3 className="text-2xl font-bold text-white leading-tight">Highly customizable</h3>
                        <p className="text-slate-400 text-lg leading-relaxed pb-4">Tailwind utility-first classes make customization trivial.</p>
                    </div>
                </div>

                <div className="mt-56 relative mx-auto max-w-[90%]">
                    <div className="absolute -z-50 size-128 -top-20 -left-32 aspect-square rounded-full bg-pink-500/30 blur-3xl opacity-50"></div>
                    <p className="text-slate-300 text-2xl md:text-3xl font-medium text-left max-w-4xl leading-relaxed">PrebuiltUI helps you build faster by transforming your design vision into fully functional, production-ready UI components.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-12">
                        <div className="md:col-span-2 relative group overflow-hidden rounded-[40px] border border-white/5 shadow-2xl">
                            <img alt="features showcase" src="pixels/features-showcase-1.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="md:col-span-1 flex flex-col justify-center">
                            <img alt="features showcase" className="hover:-translate-y-1 transition duration-500 rounded-2xl border border-white/5 mb-8 shadow-xl" src="pixels/features-showcase-2.png" />
                            <h3 className="text-3xl md:text-4xl text-white font-bold leading-tight mt-6">Better design with highest revenue and profits </h3>
                            <p className="text-slate-400 text-lg mt-4 leading-relaxed">PrebuiltUI empowers you to build beautifully and scale effortlessly.</p>
                            <a href="#" className="group flex items-center gap-3 mt-8 text-pink-600 hover:text-pink-700 transition font-bold text-xl">
                                Learn more about the product
                                <ArrowUpRight className="size-6 group-hover:translate-x-1 transition duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={cn(
            "py-24 px-6 md:px-12 transition-all",
            styles?.glassmorphism
                ? "bg-primary/5 backdrop-blur-md border-y border-white/5"
                : "bg-muted/20"
        )}>
            <div className={cn("max-w-3xl mx-auto mb-20", styles?.textAlign === 'center' ? 'text-center' : '')}>
                <div className="inline-block px-3 py-1 rounded-lg bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Features</div>
                <EditableText id={id} propKey="title" value={title} as="h2" className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight" isExport={isExport} />
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {items?.map((item: any, i: number) => (
                    <div key={i} className={cn(
                        "p-10 rounded-3xl border shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group",
                        styles?.glassmorphism
                            ? "bg-white/10 backdrop-blur-sm border-white/10"
                            : "bg-background border-border/50"
                    )}>
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:rotate-6">
                            <Check size={24} strokeWidth={2.5} />
                        </div>
                        <EditableText id={id} propKey={`items.${i}.title`} value={item.title} as="h3" className="text-xl font-bold mb-4 tracking-tight" isExport={isExport} />
                        <EditableText id={id} propKey={`items.${i}.content`} value={item.content} as="p" className="text-muted-foreground leading-relaxed text-sm font-medium" isExport={isExport} />
                    </div>
                ))}
            </div>
        </section>
    )
};
