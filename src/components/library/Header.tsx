import React from 'react';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';
import type { BaseComponentProps } from './shared-types';

interface HeaderProps extends BaseComponentProps {
    logo: string;
    logoImage?: string;
    links: { label: string; href: string }[];
    cta: string;
    secondaryCta?: string;
}

export const Header: React.FC<HeaderProps> = ({ id, logo, logoImage, links, cta, secondaryCta = 'Sign in', styles, variant, isExport }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    if (variant === 'pixels') {
        const loginLabel = secondaryCta || 'Sign in';
        return (
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-xl transition-all">
                <div className="px-6 md:px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <EditableImage
                            id={id}
                            propKey="logoImage"
                            src={logoImage || "pixels/logo.svg"}
                            alt={logo}
                            className="h-8 w-auto"
                            aspectRatio="aspect-auto"
                            isExport={isExport}
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {links?.map((link, i) => (
                            <EditableText
                                key={i}
                                id={id}
                                propKey={`links.${i}.label`}
                                value={link.label}
                                as="a"
                                href={link.href}
                                className="text-sm font-medium text-slate-400 hover:text-pink-500 transition-colors"
                                isExport={isExport}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <EditableText
                            id={id}
                            propKey="secondaryCta"
                            value={loginLabel}
                            as="a"
                            href="#!"
                            className="hidden md:block text-slate-300 hover:text-white font-medium text-sm transition-colors"
                            isExport={isExport}
                        />
                        <EditableText id={id} propKey="cta" value={cta} as="a" href="#!" className="hidden md:inline-flex px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all shadow-lg shadow-pink-600/20" isExport={isExport} />
                        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/5 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                        {links?.map((link, i) => (
                            <EditableText
                                key={i}
                                id={id}
                                propKey={`links.${i}.label`}
                                value={link.label}
                                as="a"
                                href={link.href}
                                className="text-base font-medium text-slate-400 hover:text-pink-500 transition-colors"
                                isExport={isExport}
                            />
                        ))}
                        <div className="h-px bg-white/5 w-full my-2"></div>
                        <EditableText
                            id={id}
                            propKey="secondaryCta"
                            value={loginLabel}
                            as="a"
                            href="#!"
                            className="text-slate-300 hover:text-white font-medium text-base transition-colors"
                            isExport={isExport}
                        />
                        <EditableText id={id} propKey="cta" value={cta} as="a" href="#!" className="px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all shadow-lg shadow-pink-600/20 text-center" isExport={isExport} />
                    </div>
                )}
            </nav>
        );
    }

    const loginLabel = secondaryCta || 'Log In';
    return (
        <header className={cn(
            "py-4 px-6 md:px-12 flex items-center justify-between border-b sticky top-0 z-50 transition-all",
            styles?.glassmorphism
                ? "bg-background/70 backdrop-blur-xl border-white/20"
                : "bg-background border-b",
            styles?.textAlign && `text-${styles.textAlign}`
        )}>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                    <EditableImage
                        id={id}
                        propKey="logoImage"
                        src={logoImage || "logo.svg"}
                        alt={logo}
                        className="h-8 w-auto"
                        aspectRatio="aspect-auto"
                        isExport={isExport}
                    />
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {links?.map((link, i) => (
                        <EditableText
                            key={i}
                            id={id}
                            propKey={`links.${i}.label`}
                            value={link.label}
                            as="a"
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all tracking-tight"
                            isExport={isExport}
                        />
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <EditableText
                    id={id}
                    propKey="secondaryCta"
                    value={loginLabel}
                    as="button"
                    className="hidden sm:block text-sm font-bold text-foreground hover:opacity-80 transition-opacity uppercase tracking-widest px-4 py-2"
                    isExport={isExport}
                />
                <EditableText id={id} propKey="cta" value={cta} as="button" className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all uppercase tracking-widest shadow-lg shadow-primary/10" isExport={isExport} />
            </div>
        </header>
    );
};
