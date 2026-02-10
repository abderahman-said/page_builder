import React from 'react';
import { cn } from '../../lib/utils';
import { Dribbble, Linkedin, Twitter, Youtube, Github, Instagram } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';
import { useStore } from '../../store/useStore';
import type { BaseComponentProps } from './shared-types';

interface FooterProps extends BaseComponentProps {
    content?: string;
    links?: { label: string; href: string }[];
    socials?: any;
    footerLogoImage?: string;
    badgeText?: string;
    description?: string;
    credits?: string;
    columns?: { title: string; links: string[] }[];
}

export const Footer: React.FC<FooterProps> = ({
    id,
    footerLogoImage,
    badgeText = 'Pixels.',
    description = 'Making every customer feel valued—no matter the size of your audience.',
    credits = '© 2025 PrebuiltUI.',
    columns = [
        { title: 'Product', links: ['Home', 'Support', 'Pricing', 'Affiliate'] },
        { title: 'Resources', links: ['Company', 'Blogs', 'Community', 'Careers', 'About'] },
        { title: 'Legal', links: ['Privacy', 'Terms'] },
    ],
    styles,
    variant,
    isExport
}) => {
    if (variant === 'pixels') {
        return (
            <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden gap-12 md:gap-24 mt-32 py-16 px-8 md:px-20 lg:px-32 xl:px-44 text-lg text-slate-400 border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
                <div className="flex flex-wrap items-start gap-12 md:gap-24 lg:gap-32">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                            <EditableImage
                                id={id}
                                propKey="footerLogoImage"
                                src={footerLogoImage || "pixels/footer-logo.svg"}
                                alt="footer logo"
                                className="size-14 rounded-2xl"
                                aspectRatio="aspect-square"
                                isExport={isExport}
                            />
                        </div>
                        <p className="text-white font-black text-2xl tracking-tighter">
                            <EditableText id={id} propKey="badgeText" value={badgeText} as="span" isExport={isExport} />
                        </p>
                    </div>
                    {columns.map((column, colIdx) => (
                        <div key={colIdx}>
                            <EditableText
                                id={id}
                                propKey={`columns.${colIdx}.title`}
                                value={column.title}
                                as="p"
                                className="text-white font-bold text-xl mb-6 uppercase tracking-widest text-sm"
                                isExport={isExport}
                            />
                            <ul className="space-y-3 font-medium">
                                {column.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <EditableText
                                            id={id}
                                            propKey={`columns.${colIdx}.links.${linkIdx}`}
                                            value={link}
                                            as="a"
                                            href="#!"
                                            className="hover:text-pink-500 transition-colors"
                                            isExport={isExport}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col max-md:items-center max-md:text-center gap-6 items-end">
                    <EditableText
                        id={id}
                        propKey="description"
                        value={description}
                        as="p"
                        className="max-w-80 text-right max-md:text-center text-lg leading-relaxed font-medium"
                        isExport={isExport}
                    />
                    <div className="flex items-center gap-6 mt-2">
                        <Dribbble className="size-8 hover:text-pink-500 cursor-pointer transition-all hover:scale-110" />
                        <Linkedin className="size-8 hover:text-pink-500 cursor-pointer transition-all hover:scale-110" />
                        <Twitter className="size-8 hover:text-pink-500 cursor-pointer transition-all hover:scale-110" />
                        <Youtube className="size-9 hover:text-pink-500 cursor-pointer transition-all hover:scale-110" />
                    </div>
                    <p className="mt-4 text-center font-bold">
                        <EditableText
                            id={id}
                            propKey="credits"
                            value={credits}
                            as="span"
                            className="text-center font-bold"
                            isExport={isExport}
                        />
                    </p>
                </div>
            </footer>
        )
    }

    return (
        <footer className={cn(
            "py-24 px-6 md:px-12 border-t relative overflow-hidden transition-all bg-background",
            styles?.glassmorphism && "backdrop-blur-xl bg-background/60 border-white/10"
        )}>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 relative z-10">
                <div className="max-w-xs space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl">
                            P
                        </div>
                        <span className="font-black text-2xl tracking-tighter">PrebuiltUI</span>
                    </div>
                    <EditableText
                        id={id}
                        propKey="description"
                        value={description}
                        as="p"
                        className="text-muted-foreground leading-relaxed font-medium"
                        isExport={isExport}
                    />
                    <div className="flex items-center gap-4">
                        {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
                    {columns.map((column, colIdx) => (
                        <div key={colIdx} className="space-y-6">
                            <EditableText
                                id={id}
                                propKey={`columns.${colIdx}.title`}
                                value={column.title}
                                as="h4"
                                className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground"
                                isExport={isExport}
                            />
                            <ul className="space-y-4">
                                {column.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <EditableText
                                            id={id}
                                            propKey={`columns.${colIdx}.links.${linkIdx}`}
                                            value={link}
                                            as="a"
                                            href="#"
                                            className="text-sm font-medium hover:text-primary transition-colors"
                                            isExport={isExport}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
                <EditableText
                    id={id}
                    propKey="credits"
                    value={credits}
                    as="p"
                    className="text-xs font-medium text-muted-foreground"
                    isExport={isExport}
                />
                <div className="flex gap-8 text-xs font-medium text-muted-foreground">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
};
