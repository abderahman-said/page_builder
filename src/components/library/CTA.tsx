import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import type { BaseComponentProps } from './shared-types';

interface CTAProps extends BaseComponentProps {
    title: string;
    subtitle: string;
    buttonText: string;
}

export const CTA: React.FC<CTAProps> = ({ id, title, subtitle, buttonText, styles, variant, isExport }) => {
    if (variant === 'pixels') {
        return (
            <div className="max-w-[85%] py-24 mt-20 mb-32 md:pl-24 md:w-full max-md:mx-6 md:mx-auto flex flex-col md:flex-row max-md:gap-12 items-center justify-between text-left bg-gradient-to-br from-pink-800 to-pink-950 rounded-[48px] p-12 text-white shadow-[0_50px_100px_-20px_rgba(219,39,119,0.4)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                <div className="max-w-4xl relative z-10">
                    <EditableText id={id} propKey="title" value={title} as="h1" className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white to-pink-300 text-transparent bg-clip-text leading-tight" isExport={isExport} />
                    <EditableText id={id} propKey="subtitle" value={subtitle} as="p" className="text-white/80 text-xl md:text-2xl mt-6 font-medium max-w-2xl leading-relaxed" isExport={isExport} />
                </div>
                <button className="px-16 py-6 text-pink-600 bg-white hover:bg-slate-100 rounded-full text-xl mt-4 font-black shadow-2xl transition-all hover:scale-110 active:scale-95 relative z-10 uppercase tracking-widest shrink-0">
                    <EditableText id={id} propKey="buttonText" value={buttonText} as="span" isExport={isExport} />
                </button>
            </div>
        )
    }

    return (
        <section className={cn(
            "py-24 px-6 md:px-12 transition-all",
            styles?.glassmorphism
                ? "bg-background/20 backdrop-blur-sm"
                : ""
        )}>
            <div className="max-w-6xl mx-auto rounded-[3rem] bg-foreground p-12 md:p-24 text-center text-background shadow-[0_48px_96px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] transition-transform duration-1000 group-hover:scale-125" />
                <div className="relative z-10 space-y-12">
                    <div className="space-y-6">
                        <EditableText id={id} propKey="title" value={title} as="h2" className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]" isExport={isExport} />
                        <EditableText id={id} propKey="subtitle" value={subtitle} as="p" className="text-xl opacity-70 max-w-2xl mx-auto font-medium leading-relaxed" isExport={isExport} />
                    </div>
                    <button className="px-12 py-5 bg-primary text-primary-foreground font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center gap-3 mx-auto">
                        <EditableText id={id} propKey="buttonText" value={buttonText} as="span" isExport={isExport} />
                        <ArrowRight size={20} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </section>
    );
};
