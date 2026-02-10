import React from 'react';
import { User, Mail, ArrowRight } from 'lucide-react';
import { EditableText } from '../editor/EditableText';
import type { BaseComponentProps } from './shared-types';

interface ContactProps extends BaseComponentProps {
    title?: string;
    subtitle?: string;
    badgeText?: string;
    buttonText?: string;
    nameLabel?: string;
    emailLabel?: string;
    messageLabel?: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    messagePlaceholder?: string;
}

export const Contact: React.FC<ContactProps> = ({
    id,
    variant,
    title = 'Reach out to us',
    subtitle = 'Ready to grow your brand? Let’s connect and build something exceptional together.',
    badgeText = 'Contact',
    buttonText = 'Submit',
    nameLabel = 'Your name',
    emailLabel = 'Email id',
    messageLabel = 'Message',
    namePlaceholder = 'Enter your name',
    emailPlaceholder = 'Enter your email',
    messagePlaceholder = 'Enter your message',
    isExport
}) => {
    // Only pixels variant for now
    if (variant === 'pixels') {
        return (
            <section className="px-6 md:px-10 py-32 scroll-mt-20 flex flex-col items-center" id="contact">
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
                <EditableText
                    id={id}
                    propKey="subtitle"
                    value={subtitle}
                    as="p"
                    className="text-slate-400 text-center mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                    isExport={isExport}
                />

                <form className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto text-slate-300 mt-24 w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <EditableText id={id} propKey="nameLabel" value={nameLabel} as="p" className="font-bold text-lg text-slate-300 ml-2" isExport={isExport} />
                        <div className="flex items-center pl-6 rounded-[24px] border border-slate-700 bg-slate-950 focus-within:border-pink-500 transition-all shadow-xl p-2">
                            <User className="size-6 text-slate-500" />
                            <input placeholder={namePlaceholder} className="w-full p-4 outline-none bg-transparent placeholder:text-slate-700 text-lg font-medium" type="text" name="name" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <EditableText id={id} propKey="emailLabel" value={emailLabel} as="p" className="font-bold text-lg text-slate-300 ml-2" isExport={isExport} />
                        <div className="flex items-center pl-6 rounded-[24px] border border-slate-700 bg-slate-950 focus-within:border-pink-500 transition-all shadow-xl p-2">
                            <Mail className="size-6 text-slate-500" />
                            <input placeholder={emailPlaceholder} className="w-full p-4 outline-none bg-transparent placeholder:text-slate-700 text-lg font-medium" type="email" name="email" />
                        </div>
                    </div>
                    <div className="sm:col-span-2 space-y-4">
                        <EditableText id={id} propKey="messageLabel" value={messageLabel} as="p" className="font-bold text-lg text-slate-300 ml-2" isExport={isExport} />
                        <textarea name="message" rows={6} placeholder={messagePlaceholder} className="focus:border-pink-500 resize-none w-full p-8 outline-none rounded-[32px] border border-slate-700 bg-slate-950 placeholder:text-slate-700 transition-all shadow-xl text-lg font-medium leading-relaxed"></textarea>
                    </div>
                    <button type="submit" className="w-max flex items-center gap-4 bg-pink-600 hover:bg-pink-700 text-white px-14 py-6 rounded-full transition-all hover:scale-110 active:scale-95 shadow-2xl shadow-pink-600/30 font-black text-xl uppercase tracking-widest mt-4">
                        <EditableText id={id} propKey="buttonText" value={buttonText} as="span" isExport={isExport} />
                        <ArrowRight className="size-7" />
                    </button>
                </form>
            </section>
        )
    }
    return null;
};
