import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import type { BaseComponentProps, FAQItem } from './shared-types';

interface FAQProps extends BaseComponentProps {
    title: string;
    items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ id, title, items, styles, variant, isExport }) => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section className={cn(
            "py-32 px-6 md:px-12 transition-all relative overflow-hidden",
            variant === 'pixels' ? "bg-slate-950" : (styles?.glassmorphism ? "bg-background/40 backdrop-blur-xl" : "bg-background")
        )}>
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none" />

            <div className={cn("mx-auto relative z-10", variant === 'pixels' ? "max-w-5xl" : "max-w-4xl")}>
                <div className="text-center mb-24 space-y-6">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-[0.2em]",
                        variant === 'pixels' ? "bg-pink-950/70 border-pink-800 text-pink-500" : "bg-primary/10 border-primary/20 text-primary"
                    )}>
                        Help Center
                    </div>
                    <EditableText id={id} propKey="title" value={title} as="h2" className={cn(
                        "font-black tracking-tighter leading-none text-white",
                        variant === 'pixels' ? "text-5xl md:text-8xl" : "text-4xl md:text-7xl"
                    )} isExport={isExport} />
                </div>

                <div className={cn("grid gap-6 mx-auto", variant === 'pixels' ? "max-w-4xl" : "max-w-3xl")}>
                    {items?.map((item, i) => (
                        <div key={i} className={cn(
                            "group rounded-[32px] border transition-all duration-500 overflow-hidden",
                            openIndex === i
                                ? (variant === 'pixels' ? "border-pink-500/50 bg-pink-950/30 font-bold" : "border-primary/50 bg-primary/[0.03] shadow-2xl shadow-primary/5")
                                : (variant === 'pixels' ? "bg-slate-900/50 border-white/5 hover:border-pink-500/20" : styles?.glassmorphism ? "bg-white/5 border-white/5 hover:border-white/20" : "border-border/50 bg-muted/20 hover:border-primary/20")
                        )}>
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-10 text-left group/btn"
                            >
                                <EditableText id={id} propKey={`items.${i}.question`} value={item.question} as="span" className={cn(
                                    "font-bold tracking-tight pr-10",
                                    variant === 'pixels' ? "text-2xl text-white" : "text-xl"
                                )} isExport={isExport} />
                                <div className={cn(
                                    "p-4 rounded-2xl transition-all duration-500 shrink-0",
                                    openIndex === i
                                        ? (variant === 'pixels' ? "bg-pink-600 text-white rotate-180" : "bg-primary text-primary-foreground rotate-180")
                                        : (variant === 'pixels' ? "bg-slate-800 text-slate-400 group-hover/btn:bg-pink-600/20 group-hover/btn:text-pink-400" : "bg-background shadow-sm group-hover/btn:bg-primary/10 group-hover/btn:text-primary")
                                )}>
                                    <ChevronDown size={24} strokeWidth={3} />
                                </div>
                            </button>
                            <div className={cn(
                                "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                openIndex === i ? (variant === 'pixels' ? "max-h-[800px] opacity-100 pb-12 px-10" : "max-h-[500px] opacity-100 pb-8 px-8") : "max-h-0 opacity-0"
                            )}>
                                <div className={cn("mb-8 w-full", variant === 'pixels' ? "h-px bg-pink-500/10" : "h-px bg-primary/10")} />
                                <EditableText id={id} propKey={`items.${i}.answer`} value={item.answer} as="p" multiline className={cn(
                                    "leading-relaxed font-medium",
                                    variant === 'pixels' ? "text-slate-400 text-xl" : "text-muted-foreground text-lg"
                                )} isExport={isExport} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
