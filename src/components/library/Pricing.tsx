import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import type { BaseComponentProps, PricingItem } from './shared-types';

interface PricingProps extends BaseComponentProps {
    title: string;
    items: PricingItem[];
}

export const Pricing: React.FC<PricingProps> = ({ id, title, items, styles, variant, isExport }) => {
    if (variant === 'pixels') {
        const plans = items || [];
        const getPlan = (idx: number, fallback: any) => plans[idx] || fallback;

        return (
            <section id="pricing" className="px-6 md:px-10  scroll-mt-20 py-32">
                <p className="text-center font-bold text-pink-600 px-12 py-3 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto text-sm uppercase tracking-widest">Pricing</p>
                <EditableText id={id} propKey="title" value={title} as="h3" className="text-5xl md:text-7xl font-bold text-center mx-auto mt-8 text-white tracking-tight" isExport={isExport} />
                <p className="text-slate-400 text-center mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">Flexible pricing options designed to meet your needs — whether you're just getting started or scaling up.</p>

                <div className="flex flex-wrap items-center justify-center gap-10 mt-24">
                    {/* Basic Plan */}
                    <div className="w-[400px] text-center border border-pink-950 p-10 pb-20 rounded-[32px] bg-pink-950/30 hover:border-pink-500/30 transition-all duration-300 hover:scale-105 shadow-2xl">
                        <EditableText id={id} propKey={`items.0.name`} value={getPlan(0, { name: 'Basic' }).name} as="p" className="font-bold text-xl text-slate-300" isExport={isExport} />
                        <h1 className="text-5xl font-bold mt-4 text-white">{getPlan(0, { price: '$29' }).price}<span className="text-slate-500 font-normal text-lg">/month</span></h1>
                        <ul className="list-none text-slate-400 mt-10 space-y-4 text-left">
                            {(getPlan(0, { features: ['Access to all basic courses', 'Community support', '10 practice projects'] }).features || []).map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Check className="size-6 text-pink-600 shrink-0" />
                                    <p className="text-lg">{f}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="w-full py-5 rounded-2xl font-bold text-lg mt-10 transition-all bg-pink-500 hover:bg-pink-600 text-white shadow-xl shadow-pink-600/20">
                            <EditableText id={id} propKey={`items.0.buttonText`} value={getPlan(0, { buttonText: 'Get Started' }).buttonText} as="span" isExport={isExport} />
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="w-[420px] text-center border border-pink-500/50 p-12 pb-24 rounded-[40px] bg-pink-950 relative transform md:-translate-y-6 shadow-[0_40px_80px_-20px_rgba(219,39,119,0.3)] z-10 transition-transform hover:scale-110">
                        <p className="absolute px-6 text-sm -top-4 left-1/2 -translate-x-1/2 py-2 bg-pink-500 rounded-full text-white font-bold shadow-lg uppercase tracking-widest">Most Popular</p>
                        <EditableText id={id} propKey={`items.1.name`} value={getPlan(1, { name: 'Pro' }).name} as="p" className="font-bold text-2xl text-white" isExport={isExport} />
                        <h1 className="text-6xl font-black mt-4 text-white">{getPlan(1, { price: '$79' }).price}<span className="text-slate-400 font-normal text-xl">/month</span></h1>
                        <ul className="list-none text-slate-300 mt-12 space-y-4 text-left">
                            {(getPlan(1, { features: ['Access to all Pro courses', 'Priority community support', '30 practice projects'] }).features || []).map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Check className="size-7 text-pink-500 shrink-0" />
                                    <p className="text-xl font-medium">{f}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="w-full py-6 rounded-[24px] font-bold text-xl mt-12 transition-all bg-white text-pink-600 hover:bg-slate-100 shadow-2xl">
                            <EditableText id={id} propKey={`items.1.buttonText`} value={getPlan(1, { buttonText: 'Get Started' }).buttonText} as="span" isExport={isExport} />
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="w-[400px] text-center border border-pink-950 p-10 pb-20 rounded-[32px] bg-pink-950/30 hover:border-pink-500/30 transition-all duration-300 hover:scale-105 shadow-2xl">
                        <EditableText id={id} propKey={`items.2.name`} value={getPlan(2, { name: 'Enterprise' }).name} as="p" className="font-bold text-xl text-slate-300" isExport={isExport} />
                        <h1 className="text-5xl font-bold mt-4 text-white">{getPlan(2, { price: '$199' }).price}<span className="text-slate-500 font-normal text-lg">/month</span></h1>
                        <ul className="list-none text-slate-400 mt-10 space-y-4 text-left">
                            {(getPlan(2, { features: ['Access to all courses', 'Dedicated support', 'Unlimited projects'] }).features || []).map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Check className="size-6 text-pink-600 shrink-0" />
                                    <p className="text-lg">{f}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="w-full py-5 rounded-2xl font-bold text-lg mt-10 transition-all bg-pink-500 hover:bg-pink-600 text-white shadow-xl shadow-pink-600/20">
                            <EditableText id={id} propKey={`items.2.buttonText`} value={getPlan(2, { buttonText: 'Get Started' }).buttonText} as="span" isExport={isExport} />
                        </button>
                    </div>
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
                <div className="inline-block px-3 py-1 rounded-lg bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Pricing</div>
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
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase px-6 py-2 rounded-bl-2xl tracking-widest shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <div className="space-y-4">
                            <EditableText id={id} propKey={`items.${i}.name`} value={item.name} as="h3" className={cn("text-xs font-black uppercase tracking-widest text-muted-foreground")} isExport={isExport} />
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black tracking-tighter text-foreground">{item.price}</span>
                                <span className={cn("text-xs font-bold uppercase tracking-widest opacity-60")}>/month</span>
                            </div>
                        </div>
                        <ul className="space-y-4 flex-1">
                            {item.features?.map((f: string, j: number) => (
                                <li key={j} className="flex items-start gap-3">
                                    <span className={cn("flex items-center justify-center w-5 h-5 rounded-full", item.popular ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                        <Check size={10} strokeWidth={4} />
                                    </span>
                                    <span className="text-sm font-medium leading-tight text-muted-foreground">{f}</span>
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
