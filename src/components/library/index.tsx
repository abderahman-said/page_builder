import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, ArrowRight, ArrowUpRight, Check, Twitter, Github, Linkedin, Instagram, User, Mail, Menu, X, Video, Dribbble, Youtube, ChevronRight, Upload } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import { useStore } from '../../store/useStore';

export const Header: React.FC<any> = ({ id, logo, logoImage, links, cta, styles, variant }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { openAssetsManager } = useStore();

    const handleLogoUpload = () => {
        openAssetsManager({ id, prop: 'logoImage', type: 'image' });
    };

    if (variant === 'pixels') {
        return (
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-xl transition-all">
                <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {logoImage ? (
                            <a href="/" className="block">
                                <img src={logoImage} alt={logo} className="h-8 w-auto object-contain" />
                            </a>
                        ) : (
                            <EditableText id={id} propKey="logo" value={logo} as="a" href="/" className="font-bold text-xl tracking-tight text-white" />
                        )}
                        <button
                            onClick={handleLogoUpload}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                            title="Upload logo"
                        >
                            <Upload size={14} />
                        </button>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {links?.map((link: any, i: number) => (
                            <a key={i} href={link.href} className="text-sm font-medium text-slate-400 hover:text-pink-500 transition-colors">{link.label}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#!" className="hidden md:block text-slate-300 hover:text-white font-medium text-sm transition-colors">Sign in</a>
                        <EditableText id={id} propKey="cta" value={cta} as="a" href="#!" className="hidden md:inline-flex px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all shadow-lg shadow-pink-600/20" />
                        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/5 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                        {links?.map((link: any, i: number) => (
                            <a key={i} href={link.href} className="text-base font-medium text-slate-400 hover:text-pink-500 transition-colors">{link.label}</a>
                        ))}
                        <div className="h-px bg-white/5 w-full my-2"></div>
                        <a href="#!" className="text-slate-300 hover:text-white font-medium text-base transition-colors">Sign in</a>
                        <EditableText id={id} propKey="cta" value={cta} as="a" href="#!" className="px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-all shadow-lg shadow-pink-600/20 text-center" />
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
                        <EditableText id={id} propKey="logo" value={logo} as="div" className="font-bold text-xl tracking-tight text-foreground" />
                    )}
                    <button
                        onClick={handleLogoUpload}
                        className="p-1.5 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                        title="Upload logo"
                    >
                        <Upload size={14} />
                    </button>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {links?.map((link: any, i: number) => (
                        <a key={i} href={link.href} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest leading-none">
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <button className="hidden sm:block text-sm font-bold text-foreground hover:opacity-80 transition-opacity uppercase tracking-widest px-4 py-2">
                    Log In
                </button>
                <EditableText id={id} propKey="cta" value={cta} as="button" className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all uppercase tracking-widest shadow-lg shadow-primary/10" />
            </div>
        </header>
    );
};

export const Hero: React.FC<any> = ({ id, title, subtitle, buttonText, image, variant, styles }) => {
    if (variant === 'pixels') {
        return (
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 xl:px-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-500 text-xs font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                        </span>
                        New features available
                        <ChevronRight className="size-3" />
                    </div>

                    <EditableText id={id} propKey="title" value={title} as="h1" className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]" />
                    <EditableText id={id} propKey="subtitle" value={subtitle} as="p" className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed" />

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <EditableText id={id} propKey="buttonText" value={buttonText} as="button" className="px-8 py-4 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-medium transition-all shadow-lg shadow-pink-600/25 flex items-center gap-2 group" />
                        <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center gap-2">
                            <Video className="size-5 text-slate-400" />
                            Watch Demo
                        </button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 grayscale opacity-70">
                        {/* We can add logos here later if needed, for now just spacing */}
                    </div>
                </div>

                <div className="mt-12 relative max-w-6xl mx-auto rounded-2xl border border-white/10 bg-slate-950/50 backdrop-blur-sm p-4 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                    <img src={image || "/pixels/dashboard-preview.png"} alt="Dashboard" className="w-full rounded-xl shadow-2xl bg-slate-900 aspect-video object-cover" />
                </div>
            </section>
        );
    }

    if (variant === 'v2') {
        return (
            <section className={cn(
                "py-24 px-6 md:px-12 text-center relative overflow-hidden transition-all",
                styles?.glassmorphism
                    ? "bg-background/40 backdrop-blur-xl border-y border-white/10"
                    : "bg-background"
            )}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[500px] bg-primary/20 blur-[120px] -z-10 rounded-full mix-blend-screen pointer-events-none" />
                <div className="max-w-4xl mx-auto space-y-8">
                    <a href="#" className="inline-flex items-center gap-2 px-1 py-1 pr-3 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary hover:bg-primary/20 transition-all mb-8 mx-auto w-max group">
                        <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">New</span>
                        <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                            Try 30 days free trial
                            <ChevronDown className="-rotate-90" size={12} />
                        </span>
                    </a>
                    <EditableText
                        id={id}
                        propKey="title"
                        value={title}
                        as="h1"
                        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1] text-foreground"
                    />
                    <EditableText
                        id={id}
                        propKey="subtitle"
                        value={subtitle}
                        as="p"
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    />
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
                        <button className="px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2">
                            <EditableText id={id} propKey="buttonText" value={buttonText} as="span" />
                        </button>
                        <button className="px-8 py-3.5 bg-background text-foreground border border-border/50 font-medium rounded-full hover:bg-muted/50 transition-all text-sm flex items-center gap-2 group">
                            <div className="p-1 rounded bg-muted group-hover:bg-foreground group-hover:text-background transition-colors">
                                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-current border-b-[3px] border-b-transparent ml-0.5" />
                            </div>
                            Watch Demo
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                        {['No credit card', '30 days free trial', 'Setup in 10 minutes'].map((text, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Check size={16} className="text-primary" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={cn(
            "py-20 px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 border-b transition-all",
            styles?.glassmorphism
                ? "bg-background/40 backdrop-blur-xl border-white/10"
                : "bg-background",
            styles?.textAlign && `text-${styles.textAlign}`
        )}>
            <div className="flex-1 space-y-8">
                <EditableText
                    id={id}
                    propKey="title"
                    value={title}
                    as="h1"
                    className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-foreground"
                />
                <EditableText
                    id={id}
                    propKey="subtitle"
                    value={subtitle}
                    as="p"
                    className="text-xl text-muted-foreground max-w-xl leading-relaxed font-medium"
                />
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-sm uppercase tracking-wider">
                        <EditableText id={id} propKey="buttonText" value={buttonText} as="span" />
                    </button>
                    <div className="flex -space-x-3 items-center ml-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden flex items-center justify-center font-bold text-[10px] text-muted-foreground">
                                {i}
                            </div>
                        ))}
                        <span className="pl-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Joined by 2k+ founders</span>
                    </div>
                </div>
            </div>
            {image && (
                <div className="flex-1 w-full max-w-xl aspect-[4/3] relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <img src={image} alt="Hero" className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-1000" />
                </div>
            )}
        </section>
    );
};

export const Features: React.FC<any> = ({ id, title, items, styles, variant }) => {
    if (variant === 'pixels') {
        return (
            <section id="features" className="px-4 md:px-16 lg:px-24 xl:px-32 scroll-mt-20 py-24">
                <p className="text-center font-medium text-pink-600 px-10 py-2 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto">
                    Features
                </p>
                <EditableText
                    id={id}
                    propKey="title"
                    value={title}
                    as="h3"
                    className="text-3xl font-semibold text-center mx-auto mt-4"
                />
                <p className="text-slate-300 text-center mt-2 max-w-xl mx-auto">
                    Components, patterns and pages — everything you need to ship.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
                    <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 max-w-80 w-full hover:border-pink-500/50 transition-colors duration-300">
                        <img alt="Lightning-fast setup" src="/pixels/zap-icon.svg" className="w-10 h-10" />
                        <h3 className="text-base font-medium text-white">Lightning-fast setup</h3>
                        <p className="text-slate-400 line-clamp-2 pb-4">Launch production-ready pages in minutes with prebuilt components.</p>
                    </div>
                    <div className="p-px rounded-[13px] bg-gradient-to-br from-pink-600 to-slate-800">
                        <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 max-w-80 w-full h-full">
                            <img alt="Pixel perfect" src="/pixels/thumb-icon.svg" className="w-10 h-10" />
                            <h3 className="text-base font-medium text-white">Pixel perfect</h3>
                            <p className="text-slate-400 line-clamp-2 pb-4">Modern Figma-driven UI that translates to exact code.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 max-w-80 w-full hover:border-pink-500/50 transition-colors duration-300">
                        <img alt="Highly customizable" src="/pixels/shape-icon.svg" className="w-10 h-10" />
                        <h3 className="text-base font-medium text-white">Highly customizable</h3>
                        <p className="text-slate-400 line-clamp-2 pb-4">Tailwind utility-first classes make customization trivial.</p>
                    </div>
                </div>

                <div className="mt-40 relative mx-auto max-w-5xl">
                    <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-pink-500/40 blur-3xl opacity-50"></div>
                    <p className="text-slate-300 text-lg text-left max-w-3xl">PrebuiltUI helps you build faster by transforming your design vision into fully functional, production-ready UI components.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
                        <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-white/5">
                            <img alt="features showcase" src="/pixels/features-showcase-1.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="md:col-span-1">
                            <img alt="features showcase" className="hover:-translate-y-0.5 transition duration-300 rounded-xl border border-white/5 mb-6" src="/pixels/features-showcase-2.png" />
                            <h3 className="text-[24px]/7.5 text-slate-300 font-medium mt-6">Better design with highest revenue and profits </h3>
                            <p className="text-slate-300 mt-2">PrebuiltUI empowers you to build beautifully and scale effortlessly.</p>
                            <a href="#" className="group flex items-center gap-2 mt-4 text-pink-600 hover:text-pink-700 transition font-medium">
                                Learn more about the product
                                <ArrowUpRight className="size-5 group-hover:translate-x-0.5 transition duration-300" />
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
                <EditableText id={id} propKey="title" value={title} as="h2" className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight" />
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
                        <EditableText id={id} propKey={`items.${i}.title`} value={item.title} as="h3" className="text-xl font-bold mb-4 tracking-tight" />
                        <EditableText id={id} propKey={`items.${i}.content`} value={item.content} as="p" className="text-muted-foreground leading-relaxed text-sm font-medium" />
                    </div>
                ))}
            </div>
        </section>
    )
};

export const Pricing: React.FC<any> = ({ id, title, items, styles, variant }) => {
    if (variant === 'pixels') {
        const plans = items || [];
        const getPlan = (idx: number, fallback: any) => plans[idx] || fallback;

        return (
            <section id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32 scroll-mt-20 py-24">
                <p className="text-center font-medium text-pink-600 px-10 py-2 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto">Pricing</p>
                <EditableText id={id} propKey="title" value={title} as="h3" className="text-3xl font-semibold text-center mx-auto mt-4" />
                <p className="text-slate-300 text-center mt-2 max-w-xl mx-auto">Flexible pricing options designed to meet your needs — whether you're just getting started or scaling up.</p>

                <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
                    {/* Basic Plan */}
                    <div className="w-72 text-center border border-pink-950 p-6 pb-16 rounded-xl bg-pink-950/30 hover:border-pink-500/30 transition-all duration-300">
                        <EditableText id={id} propKey={`items.0.name`} value={getPlan(0, { name: 'Basic' }).name} as="p" className="font-semibold" />
                        <h1 className="text-3xl font-semibold mt-2 text-primary">{getPlan(0, { price: '$29' }).price}<span className="text-gray-500 font-normal text-sm">/month</span></h1>
                        <ul className="list-none text-slate-300 mt-6 space-y-2 text-left">
                            {(getPlan(0, { features: ['Access to all basic courses', 'Community support', '10 practice projects'] }).features || []).map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Check className="size-4.5 text-pink-600 shrink-0" />
                                    <p className="text-sm">{f}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="w-full py-2.5 rounded-md font-medium mt-7 transition-all bg-pink-500 hover:bg-pink-600 text-white">
                            <EditableText id={id} propKey={`items.0.buttonText`} value={getPlan(0, { buttonText: 'Get Started' }).buttonText} as="span" />
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="w-72 text-center border border-pink-950 p-6 pb-16 rounded-xl bg-pink-950 relative transform md:-translate-y-4 shadow-xl shadow-pink-900/20">
                        <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-pink-400 rounded-full text-white font-medium shadow-lg">Most Popular</p>
                        <EditableText id={id} propKey={`items.1.name`} value={getPlan(1, { name: 'Pro' }).name} as="p" className="font-semibold" />
                        <h1 className="text-3xl font-semibold mt-2 text-primary">{getPlan(1, { price: '$79' }).price}<span className="text-gray-500 font-normal text-sm">/month</span></h1>
                        <ul className="list-none text-slate-300 mt-6 space-y-2 text-left">
                            {(getPlan(1, { features: ['Access to all Pro courses', 'Priority community support', '30 practice projects'] }).features || []).map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Check className="size-4.5 text-pink-600 shrink-0" />
                                    <p className="text-sm">{f}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="w-full py-2.5 rounded-md font-medium mt-7 transition-all bg-white text-pink-600 hover:bg-slate-200">
                            <EditableText id={id} propKey={`items.1.buttonText`} value={getPlan(1, { buttonText: 'Get Started' }).buttonText} as="span" />
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="w-72 text-center border border-pink-950 p-6 pb-16 rounded-xl bg-pink-950/30 hover:border-pink-500/30 transition-all duration-300">
                        <EditableText id={id} propKey={`items.2.name`} value={getPlan(2, { name: 'Enterprise' }).name} as="p" className="font-semibold" />
                        <h1 className="text-3xl font-semibold mt-2 text-primary">{getPlan(2, { price: '$199' }).price}<span className="text-gray-500 font-normal text-sm">/month</span></h1>
                        <ul className="list-none text-slate-300 mt-6 space-y-2 text-left">
                            {(getPlan(2, { features: ['Access to all courses', 'Dedicated support', 'Unlimited projects'] }).features || []).map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Check className="size-4.5 text-pink-600 shrink-0" />
                                    <p className="text-sm">{f}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="w-full py-2.5 rounded-md font-medium mt-7 transition-all bg-pink-500 hover:bg-pink-600 text-white">
                            <EditableText id={id} propKey={`items.2.buttonText`} value={getPlan(2, { buttonText: 'Get Started' }).buttonText} as="span" />
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
            {/* ... existing pricing code ... */}
            <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
                <div className="inline-block px-3 py-1 rounded-lg bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Pricing</div>
                <EditableText id={id} propKey="title" value={title} as="h2" className="text-4xl md:text-6xl font-black tracking-tighter" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {items?.map((item: any, i: number) => (
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
                            <EditableText id={id} propKey={`items.${i}.name`} value={item.name} as="h3" className={cn("text-xs font-black uppercase tracking-widest text-muted-foreground")} />
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
                            <EditableText id={id} propKey={`items.${i}.buttonText`} value={item.buttonText} as="span" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
};

export const Testimonials: React.FC<any> = ({ id, title, items, styles, variant }) => {
    if (variant === 'pixels') {
        const row1 = items?.slice(0, Math.ceil((items?.length || 0) / 2)) || [];
        const row2 = items?.slice(Math.ceil((items?.length || 0) / 2)) || [];

        return (
            <section id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32 scroll-mt-20 py-24 overflow-hidden">
                <p className="text-center font-medium text-pink-600 px-10 py-2 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto">Testimonials</p>
                <EditableText
                    id={id}
                    propKey="title"
                    value={title}
                    as="h3"
                    className="text-3xl font-semibold text-center mx-auto mt-4"
                />
                <p className="text-slate-300 text-center mt-2 max-w-xl mx-auto">Hear what our users say about us. We're always looking for ways to improve.</p>

                {/* Row 1 */}
                <div className="w-full mx-auto max-w-5xl overflow-hidden relative mt-16">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r  from-[#020618]  to-transparent"></div>
                    <div className="flex gap-6 animate-scroll min-w-max pb-8">
                        {[...row1, ...row1, ...row1].map((item: any, i: number) => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-950 w-80 shrink-0">
                                <p className="text-slate-400 mb-6 leading-relaxed">"{item.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-pink-600/20 text-pink-500 flex items-center justify-center font-bold">
                                        {item.name ? item.name[0] : 'U'}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">{item.name}</p>
                                        <p className="text-slate-500 text-xs">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l  from-[#020618]  to-transparent"></div>
                </div>

                {/* Row 2 (Reverse) */}
                <div className="w-full mx-auto max-w-5xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r  from-[#020618]  to-transparent"></div>
                    <div className="flex gap-6 animate-scroll-reverse min-w-max pb-8">
                        {[...row2, ...row2, ...row2].map((item: any, i: number) => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-950 w-80 shrink-0">
                                <p className="text-slate-400 mb-6 leading-relaxed">"{item.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-pink-600/20 text-pink-500 flex items-center justify-center font-bold">
                                        {item.name ? item.name[0] : 'U'}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">{item.name}</p>
                                        <p className="text-slate-500 text-xs">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#020618] to-transparent"></div>
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
                <div className="inline-block px-3 py-1 rounded-lg bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Testimonials</div>
                <EditableText id={id} propKey="title" value={title} as="h2" className="text-4xl md:text-6xl font-black tracking-tighter" />
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {items?.map((item: any, i: number) => (
                    <div key={i} className={cn(
                        "p-10 rounded-[2rem] border shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all group",
                        styles?.glassmorphism
                            ? "bg-white/10 backdrop-blur-md border-white/10"
                            : "bg-background border-border/40"
                    )}>
                        <p className="text-xl font-medium relative z-10 mb-10 leading-relaxed text-foreground tracking-tight">"{item.quote}"</p>
                        <div className="flex items-center gap-5">
                            <img src={item.avatar} alt={item.name} className="w-14 h-14 rounded-2xl bg-muted object-cover border border-border/50" />
                            <div className="flex flex-col">
                                <span className="font-black text-sm uppercase tracking-wider">{item.name}</span>
                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const FAQ: React.FC<any> = ({ id, title, items, styles }) => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section className={cn(
            "py-24 px-6 md:px-12 transition-all relative overflow-hidden",
            styles?.glassmorphism
                ? "bg-background/40 backdrop-blur-xl"
                : "bg-background"
        )}>
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        Help Center
                    </div>
                    <EditableText id={id} propKey="title" value={title} as="h2" className="text-4xl md:text-7xl font-black tracking-tighter leading-none" />
                </div>

                <div className="grid gap-4 max-w-3xl mx-auto">
                    {items?.map((item: any, i: number) => (
                        <div key={i} className={cn(
                            "group rounded-[2rem] border transition-all duration-500 overflow-hidden",
                            openIndex === i
                                ? "border-primary/50 bg-primary/[0.03] shadow-2xl shadow-primary/5"
                                : styles?.glassmorphism
                                    ? "bg-white/5 border-white/5 hover:border-white/20"
                                    : "border-border/50 bg-muted/20 hover:border-primary/20"
                        )}>
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-8 text-left group/btn"
                            >
                                <EditableText id={id} propKey={`items.${i}.question`} value={item.question} as="span" className="text-xl font-bold tracking-tight pr-8" />
                                <div className={cn(
                                    "p-3 rounded-2xl transition-all duration-500 shrink-0",
                                    openIndex === i
                                        ? "bg-primary text-primary-foreground rotate-180"
                                        : "bg-background shadow-sm group-hover/btn:bg-primary/10 group-hover/btn:text-primary"
                                )}>
                                    <ChevronDown size={20} strokeWidth={2.5} />
                                </div>
                            </button>
                            <div className={cn(
                                "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                openIndex === i ? "max-h-[500px] opacity-100 pb-8 px-8" : "max-h-0 opacity-0"
                            )}>
                                <div className="h-px bg-primary/10 mb-6 w-full" />
                                <EditableText id={id} propKey={`items.${i}.answer`} value={item.answer} as="p" multiline className="text-muted-foreground leading-relaxed text-lg font-medium" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Contact: React.FC<any> = ({ variant }) => {
    // Only pixels variant for now
    if (variant === 'pixels') {
        return (
            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-24 scroll-mt-20" id="contact">
                <p className="text-center font-medium text-pink-600 px-10 py-2 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto">Contact</p>
                <h3 className="text-3xl font-semibold text-center mx-auto mt-4">Reach out to us</h3>
                <p className="text-slate-300 text-center mt-2 max-w-xl mx-auto">Ready to grow your brand? Let’s connect and build something exceptional together.</p>

                <form className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <p className="mb-2 font-medium">Your name</p>
                        <div className="flex items-center pl-3 rounded-lg border border-slate-700 bg-slate-950 focus-within:border-pink-500 transition-colors">
                            <User className="size-5 text-slate-400" />
                            <input placeholder="Enter your name" className="w-full p-3 outline-none bg-transparent placeholder:text-slate-600" type="text" name="name" />
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 font-medium">Email id</p>
                        <div className="flex items-center pl-3 rounded-lg border border-slate-700 bg-slate-950 focus-within:border-pink-500 transition-colors">
                            <Mail className="size-5 text-slate-400" />
                            <input placeholder="Enter your email" className="w-full p-3 outline-none bg-transparent placeholder:text-slate-600" type="email" name="email" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="mb-2 font-medium">Message</p>
                        <textarea name="message" rows={8} placeholder="Enter your message" className="focus:border-pink-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700 bg-slate-950 placeholder:text-slate-600 transition-colors"></textarea>
                    </div>
                    <button type="submit" className="w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-600/20">
                        Submit
                        <ArrowRight className="size-5" />
                    </button>
                </form>
            </section>
        )
    }
    return null;
};

export const CTA: React.FC<any> = ({ id, title, subtitle, buttonText, styles, variant }) => {
    if (variant === 'pixels') {
        return (
            <div className="max-w-5xl py-16 mt-20 mb-20 md:pl-20 md:w-full max-md:mx-4 md:mx-auto flex flex-col md:flex-row max-md:gap-6 items-center justify-between text-left bg-gradient-to-b from-pink-900 to-pink-950 rounded-2xl p-6 text-white shadow-2xl shadow-pink-900/20">
                <div>
                    <EditableText id={id} propKey="title" value={title} as="h1" className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-pink-400 text-transparent bg-clip-text" />
                    <EditableText id={id} propKey="subtitle" value={subtitle} as="p" className="bg-gradient-to-r from-white to-pink-400 text-transparent bg-clip-text text-lg mt-2" />
                </div>
                <button className="px-12 py-3 text-slate-800 bg-white hover:bg-slate-200 rounded-full text-sm mt-4 font-bold shadow-lg transition-all hover:scale-105 active:scale-95">
                    <EditableText id={id} propKey="buttonText" value={buttonText} as="span" />
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
                        <EditableText id={id} propKey="title" value={title} as="h2" className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]" />
                        <EditableText id={id} propKey="subtitle" value={subtitle} as="p" className="text-xl opacity-70 max-w-2xl mx-auto font-medium leading-relaxed" />
                    </div>
                    <button className="px-12 py-5 bg-primary text-primary-foreground font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center gap-3 mx-auto">
                        <EditableText id={id} propKey="buttonText" value={buttonText} as="span" />
                        <ArrowRight size={20} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export const Footer: React.FC<any> = ({ id, content, links, socials, footerLogoImage, styles, variant }) => {
    const { openAssetsManager } = useStore();

    const handleLogoUpload = () => {
        openAssetsManager({ id, prop: 'footerLogoImage', type: 'image' });
    };
    if (variant === 'pixels') {
        return (
            <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden gap-10 md:gap-20 mt-20 py-6 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
                <div className="flex flex-wrap items-start gap-10 md:gap-35">
                    <div className="flex items-center gap-3">
                        {footerLogoImage ? (
                            <img className="size-8 aspect-square" alt="footer logo" src={footerLogoImage} />
                        ) : (
                            <img className="size-8 aspect-square" alt="footer logo" src="/pixels/footer-logo.svg" />
                        )}
                        <button
                            onClick={handleLogoUpload}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                            title="Upload footer logo"
                        >
                            <Upload size={12} />
                        </button>
                    </div>
                    <div>
                        <p className="text-slate-100 font-semibold mb-4">Product</p>
                        <ul className="space-y-2">
                            {['Home', 'Support', 'Pricing', 'Affiliate'].map(item => (
                                <li key={item}><a href="#!" className="hover:text-pink-600 transition">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-100 font-semibold mb-4">Resources</p>
                        <ul className="space-y-2">
                            {['Company', 'Blogs', 'Community', 'Careers', 'About'].map(item => (
                                <li key={item}><a href="#!" className="hover:text-pink-600 transition">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-100 font-semibold mb-4">Legal</p>
                        <ul className="space-y-2">
                            {['Privacy', 'Terms'].map(item => (
                                <li key={item}><a href="#!" className="hover:text-pink-600 transition">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60 text-right max-md:text-center">Making every customer feel valued—no matter the size of your audience.</p>
                    <div className="flex items-center gap-4 mt-3">
                        <Dribbble className="size-5 hover:text-pink-500 cursor-pointer transition" />
                        <Linkedin className="size-5 hover:text-pink-500 cursor-pointer transition" />
                        <Twitter className="size-5 hover:text-pink-500 cursor-pointer transition" />
                        <Youtube className="size-6 hover:text-pink-500 cursor-pointer transition" />
                    </div>
                    <p className="mt-3 text-center">© 2025 <a href="#" className="font-medium hover:text-pink-500 transition">PrebuiltUI</a>.</p>
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

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            {footerLogoImage ? (
                                <img src={footerLogoImage} alt="Footer Logo" className="h-12 w-auto object-contain" />
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20 italic font-black text-xl">B</div>
                                    <span className="font-black text-3xl tracking-tighter">Builder<span className="text-primary italic">.</span></span>
                                </>
                            )}
                            <button
                                onClick={handleLogoUpload}
                                className="p-1.5 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                                title="Upload footer logo"
                            >
                                <Upload size={14} />
                            </button>
                        </div>
                        <EditableText id={id} propKey="content" value={content} as="p" className="text-muted-foreground text-base leading-relaxed max-w-xs font-medium" />
                        <div className="flex gap-3">
                            {socials?.map((social: any, i: number) => {
                                const iconMap: Record<string, any> = {
                                    twitter: Twitter,
                                    github: Github,
                                    linkedin: Linkedin,
                                    instagram: Instagram,
                                };
                                const Icon = iconMap[social.platform] || Twitter;
                                return (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-2xl bg-muted/50 border border-border/40 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:-rotate-6 transition-all cursor-pointer shadow-sm"
                                    >
                                        <Icon size={18} strokeWidth={2} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40">Navigation</h4>
                        <div className="flex flex-col gap-5">
                            {links?.map((link: any, i: number) => (
                                <a key={i} href={link.href} className="text-base font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40">Legal</h4>
                        <div className="flex flex-col gap-5">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Security'].map((label) => (
                                <a key={label} href="#" className="text-base font-bold text-muted-foreground hover:text-primary transition-colors">{label}</a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40">Newsletter</h4>
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-muted-foreground leading-relaxed">Join 5,000+ creators getting our weekly design tips.</p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="hello@builder.com"
                                    className="w-full bg-muted/50 px-5 py-4 rounded-[1.25rem] text-sm font-bold outline-none border-2 border-transparent focus:border-primary/20 focus:bg-background transition-all"
                                />
                                <button className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                        <span>© 2024 BUILDER INC.</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-primary italic">MADE WITH LOVE</span>
                    </div>
                    <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                        <span className="hover:text-primary cursor-pointer transition-colors">Twitter</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Dribbble</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Behance</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
