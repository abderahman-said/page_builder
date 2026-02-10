import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import type { BaseComponentProps, PricingItem } from './shared-types';

interface PricingProps extends BaseComponentProps {
    title: string;
    badgeText?: string;
    subtitle?: string;
    items: PricingItem[];
}

export const Pricing: React.FC<PricingProps> = ({
    id,
    title,
    badgeText = 'Pricing',
    subtitle,
    items,
    styles,
    variant,
    isExport
}) => {
    if (variant === 'pixels') {
        return (
            <section id="pricing" className="px-6 md:px-10  scroll-mt-20 py-32">
                <div className="flex justify-center mb-8">
                    <EditableText
                        id={id}
                        propKey="badgeText"
                        value={badgeText}
                        as="p"
                        className="text-center font-bold text-pink-600 px-12 py-3 rounded-full bg-pink-950/70 border border-pink-800 w-max text-sm uppercase tracking-widest"
                        isExport={isExport}
                    />
                </div>
                <EditableText id={id} propKey="title" value={title} as="h3" className="text-5xl md:text-7xl font-bold text-center mx-auto mt-8 text-white tracking-tight" isExport={isExport} />
                {subtitle && (
                    <EditableText
                        id={id}
                        propKey="subtitle"
                        value={subtitle}
                        as="p"
                        className="text-slate-400 text-center mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                        isExport={isExport}
                    />
                )}

                <div className="flex flex-wrap items-center justify-center gap-10 mt-24">
                    {items.map((item, i) => {
                        const isMain = item.popular;
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "text-center border p-10 pb-20 rounded-[32px] transition-all duration-300 hover:scale-105 shadow-2xl relative",
                                    isMain
                                        ? "w-[420px] border-pink-500/50 p-12 pb-24 rounded-[40px] bg-pink-950 md:-translate-y-6 shadow-[0_40px_80px_-20px_rgba(219,39,119,0.3)] z-10 hover:scale-110"
                                        : "w-[400px] border-pink-950 bg-pink-950/30 hover:border-pink-500/30"
                                )}
                            >
                                {isMain && (
                                    <EditableText
                                        id={id}
                                        propKey={`items.${i}.popularLabel`}
                                        value={item.popularLabel || 'Most Popular'}
                                        as="p"
                                        className="absolute px-6 text-sm -top-4 left-1/2 -translate-x-1/2 py-2 bg-pink-500 rounded-full text-white font-bold shadow-lg uppercase tracking-widest"
                                        isExport={isExport}
                                    />
                                )}
                                <EditableText id={id} propKey={`items.${i}.name`} value={item.name} as="p" className={cn("font-bold text-slate-300", isMain ? "text-2xl text-white" : "text-xl")} isExport={isExport} />
                                <div className="flex justify-center items-baseline mt-4">
                                    <h1 className={cn("font-bold text-white", isMain ? "text-6xl font-black" : "text-5xl")}>
                                        <EditableText id={id} propKey={`items.${i}.price`} value={item.price} as="span" isExport={isExport} />
                                        <span className={cn("font-normal", isMain ? "text-slate-400 text-xl" : "text-slate-500 text-lg")}>
                                            /month
                                        </span>
                                    </h1>
                                </div>
                                <ul className={cn("list-none mt-10 space-y-4 text-left", isMain ? "text-slate-300 mt-12" : "text-slate-400")}>
                                    {(item.features || []).map((f: string, featureIdx: number) => (
                                        <li key={featureIdx} className="flex items-center gap-3">
                                            <Check className={cn("text-pink-600 shrink-0", isMain ? "size-7 text-pink-500" : "size-6")} />
                                            <EditableText
                                                id={id}
                                                propKey={`items.${i}.features.${featureIdx}`}
                                                value={f}
                                                as="p"
                                                className={cn("text-lg", isMain ? "text-xl font-medium" : "")}
                                                isExport={isExport}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <button type="button" className={cn(
                                    "w-full py-5 rounded-2xl font-bold text-lg mt-10 transition-all shadow-xl",
                                    isMain
                                        ? "py-6 rounded-[24px] text-xl mt-12 bg-white text-pink-600 hover:bg-slate-100 shadow-2xl"
                                        : "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-600/20"
                                )}>
                                    <EditableText id={id} propKey={`items.${i}.buttonText`} value={item.buttonText} as="span" isExport={isExport} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }
    return (
        <section className={cn(
            "py-24 px-6 md:px-12 transition-all",
            styles?.glassmorphism
                ? "bg-background/30 backdrop-blur-xl"
                : "bg-background"
        )}>
            <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
                <EditableText
                    id={id}
                    propKey="badgeText"
                    value={badgeText}
                    as="div"
                    className="inline-block px-3 py-1 rounded-lg bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
                    isExport={isExport}
                />
                <EditableText id={id} propKey="title" value={title} as="h2" className="text-4xl md:text-6xl font-black tracking-tighter" isExport={isExport} />
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {items?.map((item, i) => (
                    <div key={i} className={cn(
                        "p-12 rounded-[2.5rem] border transition-all relative overflow-hidden flex flex-col gap-10",
                        item.popular
                            ? 'border-primary bg-primary/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] shadow-primary/20 scale-105 z-10'
                            : styles?.glassmorphism
                                ? 'bg-white/5 backdrop-blur-lg border-white/10 shadow-sm hover:shadow-xl hover:shadow-black/5'
                                : 'bg-background border-border shadow-sm hover:shadow-xl hover:shadow-black/5'
                    )}>
                        {item.popular && (
                            <EditableText
                                id={id}
                                propKey={`items.${i}.popularLabel`}
                                value={item.popularLabel || 'Most Popular'}
                                as="div"
                                className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase px-6 py-2 rounded-bl-2xl tracking-widest shadow-lg"
                                isExport={isExport}
                            />
                        )}
                        <div className="space-y-4">
                            <EditableText id={id} propKey={`items.${i}.name`} value={item.name} as="h3" className={cn("text-xs font-black uppercase tracking-widest text-muted-foreground")} isExport={isExport} />
                            <div className="flex items-baseline gap-1">
                                <h4 className="text-5xl font-black tracking-tighter text-foreground">
                                    <EditableText id={id} propKey={`items.${i}.price`} value={item.price} as="span" isExport={isExport} />
                                </h4>
                                <span className={cn("text-xs font-bold uppercase tracking-widest opacity-60")}>/month</span>
                            </div>
                        </div>
                        <ul className="space-y-4 flex-1">
                            {item.features?.map((f: string, j: number) => (
                                <li key={j} className="flex items-start gap-3">
                                    <span className={cn("flex items-center justify-center w-5 h-5 rounded-full", item.popular ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                        <Check size={10} strokeWidth={4} />
                                    </span>
                                    <EditableText
                                        id={id}
                                        propKey={`items.${i}.features.${j}`}
                                        value={f}
                                        as="span"
                                        className="text-sm font-medium leading-tight text-muted-foreground"
                                        isExport={isExport}
                                    />
                                </li>
                            ))}
                        </ul>
                        <button className={cn(
                            "w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                            item.popular
                                ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25"
                                : "bg-background border border-border text-foreground hover:bg-muted"
                        )}>
                            <EditableText id={id} propKey={`items.${i}.buttonText`} value={item.buttonText} as="span" isExport={isExport} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
};
