import React from 'react';
import { cn } from '../../lib/utils';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';
import type { BaseComponentProps, TestimonialItem } from './shared-types';

interface TestimonialsProps extends BaseComponentProps {
    title: string;
    badgeText?: string;
    subtitle?: string;
    items: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
    id,
    title,
    badgeText = 'Testimonials',
    subtitle,
    items,
    styles,
    variant,
    isExport
}) => {
    if (variant === 'pixels') {
        const row1 = items?.slice(0, Math.ceil((items?.length || 0) / 2)) || [];
        const row2 = items?.slice(Math.ceil((items?.length || 0) / 2)) || [];

        return (
            <section id="testimonials" className="px-6 md:px-10   scroll-mt-20 py-32 overflow-hidden flex flex-col items-center">
                <div className="flex justify-center">
                    <EditableText
                        id={id}
                        propKey="badgeText"
                        value={badgeText}
                        as="p"
                        className="text-center font-bold text-pink-600 px-12 py-3 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto text-sm uppercase tracking-widest"
                        isExport={isExport}
                    />
                </div>
                <EditableText
                    id={id}
                    propKey="title"
                    value={title}
                    as="h3"
                    className="text-5xl md:text-7xl font-bold text-center mx-auto mt-8 text-white tracking-tight"
                    isExport={isExport}
                />
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

                {/* Row 1 */}
                <div className="w-full mx-auto max-w-[90%] overflow-hidden relative mt-24">
                    <div className="absolute left-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-r from-[#020618] to-transparent"></div>
                    <div className="flex gap-10 animate-scroll min-w-max pb-12">
                        {[...row1, ...row1, ...row1].map((item, i) => {
                            const actualIdx = i % row1.length;
                            return (
                                <div key={i} className="p-10 rounded-[32px] border border-slate-800 bg-slate-950 w-[450px] shrink-0 hover:border-pink-500/30 transition-colors shadow-xl">
                                    <p className="text-slate-300 text-xl font-medium mb-10 leading-relaxed italic">
                                        "<EditableText id={id} propKey={`items.${actualIdx}.quote`} value={item.quote} as="span" isExport={isExport} />"
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <EditableImage
                                            id={id}
                                            propKey={`items.${actualIdx}.avatar`}
                                            src={item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
                                            className="w-14 h-14 rounded-2xl"
                                            aspectRatio="aspect-square"
                                            isExport={isExport}
                                        />
                                        <div>
                                            <EditableText id={id} propKey={`items.${actualIdx}.name`} value={item.name} as="p" className="text-white font-bold text-lg" isExport={isExport} />
                                            <EditableText id={id} propKey={`items.${actualIdx}.role`} value={item.role} as="p" className="text-slate-500 font-medium" isExport={isExport} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-l from-[#020618] to-transparent"></div>
                </div>

                {/* Row 2 (Reverse) */}
                <div className="w-full mx-auto max-w-[90%] overflow-hidden relative mt-4">
                    <div className="absolute left-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-r from-[#020618] to-transparent"></div>
                    <div className="flex gap-10 animate-scroll-reverse min-w-max pb-12">
                        {[...row2, ...row2, ...row2].map((item, i) => {
                            const actualIdx = (i % row2.length) + row1.length;
                            return (
                                <div key={i} className="p-10 rounded-[32px] border border-slate-800 bg-slate-950 w-[450px] shrink-0 hover:border-pink-500/30 transition-colors shadow-xl">
                                    <p className="text-slate-300 text-xl font-medium mb-10 leading-relaxed italic">
                                        "<EditableText id={id} propKey={`items.${actualIdx}.quote`} value={item.quote} as="span" isExport={isExport} />"
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <EditableImage
                                            id={id}
                                            propKey={`items.${actualIdx}.avatar`}
                                            src={item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
                                            className="w-14 h-14 rounded-2xl"
                                            aspectRatio="aspect-square"
                                            isExport={isExport}
                                        />
                                        <div>
                                            <EditableText id={id} propKey={`items.${actualIdx}.name`} value={item.name} as="p" className="text-white font-bold text-lg" isExport={isExport} />
                                            <EditableText id={id} propKey={`items.${actualIdx}.role`} value={item.role} as="p" className="text-slate-500 font-medium" isExport={isExport} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-l from-[#020618] to-transparent"></div>
                </div>
            </section>
        );
    }

    return (
        <section className={cn(
            "py-24 px-6 md:px-12 relative overflow-hidden transition-all",
            styles?.glassmorphism
                ? "bg-primary/5 backdrop-blur-lg border-y border-white/5"
                : "bg-muted/10"
        )}>
            <div className="absolute top-0 right-0 w-[40%] aspect-square bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
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
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {items?.map((item, i) => (
                    <div key={i} className={cn(
                        "p-10 rounded-3xl border shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group",
                        styles?.glassmorphism
                            ? "bg-white/10 backdrop-blur-md border-white/10"
                            : "bg-background border-border/50"
                    )}>
                        <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 opacity-80 italic">
                            "<EditableText id={id} propKey={`items.${i}.quote`} value={item.quote} as="span" isExport={isExport} />"
                        </p>
                        <div className="flex items-center gap-4">
                            <EditableImage
                                id={id}
                                propKey={`items.${i}.avatar`}
                                src={item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
                                className="w-12 h-12 rounded-2xl"
                                aspectRatio="aspect-square"
                                isExport={isExport}
                            />
                            <div>
                                <EditableText id={id} propKey={`items.${i}.name`} value={item.name} as="h4" className="font-bold tracking-tight" isExport={isExport} />
                                <EditableText id={id} propKey={`items.${i}.role`} value={item.role} as="p" className="text-sm text-muted-foreground font-medium" isExport={isExport} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
