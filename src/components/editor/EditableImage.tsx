import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { ImageIcon, RefreshCw } from 'lucide-react';

interface EditableImageProps {
    id: string;
    propKey: string;
    src: string;
    alt?: string;
    className?: string;
    isExport?: boolean;
    aspectRatio?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
    id,
    propKey,
    src,
    alt = '',
    className,
    isExport = false,
    aspectRatio = 'aspect-video'
}) => {
    const { openAssetsManager, setFocusedProp } = useStore();
    const [isHovered, setIsHovered] = useState(false);

    if (isExport) {
        return <img src={src} alt={alt} className={cn(aspectRatio, "object-cover", className)} />;
    }

    return (
        <div
            className={cn("relative group cursor-pointer overflow-hidden rounded-xl bg-muted/20", aspectRatio, className)}
            onMouseEnter={() => {
                setIsHovered(true);
                setFocusedProp(propKey);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setFocusedProp(null);
            }}
            onClick={(e) => {
                e.stopPropagation();
                openAssetsManager({ id, prop: propKey, type: 'image' });
            }}
        >
            <img
                src={src}
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-all duration-700",
                    isHovered ? "scale-105 blur-[2px] brightness-50" : "scale-100"
                )}
            />

            {/* Overlay */}
            <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
            )}>
                <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-2xl animate-in zoom-in-50 duration-300">
                    <RefreshCw size={24} className="animate-spin-slow" />
                </div>
                <div className="bg-black/80 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-2xl">
                    <ImageIcon size={14} className="text-pink-500" />
                    <span className="text-[11px] font-bold text-white uppercase tracking-widest">Change Image</span>
                </div>
            </div>

            {/* Selection indicator */}
            <div className={cn(
                "absolute inset-0 ring-2 ring-pink-500 ring-inset transition-opacity duration-300 pointer-events-none",
                isHovered ? "opacity-100" : "opacity-0"
            )} />
        </div>
    );
};
