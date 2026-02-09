import React from 'react';
import { cn } from '../../lib/utils';
import { Menu, X, Upload } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import { useStore } from '../../store/useStore';
import type { BaseComponentProps } from './shared-types';

interface HeaderProps extends BaseComponentProps {
    logo: string;
    logoImage?: string;
    links: { label: string; href: string }[];
    cta: string;
}

export const Header: React.FC<HeaderProps> = ({ id, logo, logoImage, links, cta, styles, variant, isExport }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { openAssetsManager } = useStore();

    const handleLogoUpload = () => {
        openAssetsManager({ id, prop: 'logoImage', type: 'image' });
    };

    if (variant === 'pixels') {
        return (
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-xl transition-all">
                <div className="px-6 md:px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {logoImage ? (
                            <a href="/" className="block">
                                <img src={logoImage} alt={logo} className="h-8 w-auto object-contain" />
                            </a>
                        ) : (
                            <EditableText id={id} propKey="logo" value={logo} as="a" href="/" className="font-bold text-xl tracking-tight text-white" isExport={isExport} />
                        )}
                        {!isExport && (
                            <button
                                onClick={handleLogoUpload}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                                title="Upload logo"
                            >
                                <Upload size={14} />
                            </button>
                        )}
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {links?.map((link, i) => (
                            <a key={i} href={link.href} className="text-sm font-medium text-slate-400 hover:text-pink-500 transition-colors">{link.label}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#!" className="hidden md:block text-slate-300 hover:text-white font-medium text-sm transition-colors">Sign in</a>
                        <EditableText id={id} propKey="cta" value={cta} as="a" href="#!" className="hidden md:inline-flex px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all shadow-lg shadow-pink-600/20" isExport={isExport} />
                        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/5 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                        {links?.map((link, i) => (
                            <a key={i} href={link.href} className="text-base font-medium text-slate-400 hover:text-pink-500 transition-colors">{link.label}</a>
                        ))}
                        <div className="h-px bg-white/5 w-full my-2"></div>
                        <a href="#!" className="text-slate-300 hover:text-white font-medium text-base transition-colors">Sign in</a>
                        <EditableText id={id} propKey="cta" value={cta} as="a" href="#!" className="px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all shadow-lg shadow-pink-600/20 text-center" isExport={isExport} />
                    </div>
                )}
            </nav>
        );
    }

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
                    {logoImage ? (
                        <img src={logoImage} alt={logo} className="h-8 w-auto object-contain" />
                    ) : (
                        <EditableText id={id} propKey="logo" value={logo} as="div" className="font-bold text-xl tracking-tight text-foreground" isExport={isExport} />
                    )}
                    {!isExport && (
                        <button
                            onClick={handleLogoUpload}
                            className="p-1.5 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                            title="Upload logo"
                        >
                            <Upload size={14} />
                        </button>
                    )}
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {links?.map((link, i) => (
                        <a key={i} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all tracking-tight">
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <button className="hidden sm:block text-sm font-bold text-foreground hover:opacity-80 transition-opacity uppercase tracking-widest px-4 py-2">
                    Log In
                </button>
                <EditableText id={id} propKey="cta" value={cta} as="button" className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all uppercase tracking-widest shadow-lg shadow-primary/10" isExport={isExport} />
            </div>
        </header>
    );
};
